const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const videoId = process.env.VIDEO_ID;
const storageId = process.env.STORAGE_ID;
const convexUrl = process.env.CONVEX_URL;

if (!videoId || !storageId || !convexUrl) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const RESOLUTIONS = [
  { name: "2160p", width: 3840, height: 2160, bitrate: "15000k" },
  { name: "1440p", width: 2560, height: 1440, bitrate: "8000k" },
  { name: "1080p", width: 1920, height: 1080, bitrate: "5000k" },
  { name: "720p", width: 1280, height: 720, bitrate: "2500k" },
  { name: "480p", width: 854, height: 480, bitrate: "1000k" },
  { name: "360p", width: 640, height: 360, bitrate: "600k" },
];

function getVideoInfo(inputPath) {
  return new Promise((resolve, reject) => {
    exec(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${inputPath}"`,
      (error, stdout) => {
        if (error) return reject(error);
        try {
          const info = JSON.parse(stdout);
          const videoStream = info.streams.find(
            (s) => s.codec_type === "video"
          );
          if (!videoStream) return reject(new Error("No video stream found"));
          resolve({
            width: videoStream.width,
            height: videoStream.height,
            duration: parseFloat(info.format.duration),
          });
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

function transcodeToHLS(
  inputPath,
  outputDir,
  resolution,
  originalWidth,
  originalHeight
) {
  return new Promise((resolve, reject) => {
    if (
      resolution.width > originalWidth ||
      resolution.height > originalHeight
    ) {
      return resolve(null);
    }

    const outputPath = path.join(outputDir, `${resolution.name}.m3u8`);
    const segmentPath = path.join(outputDir, `${resolution.name}_%03d.ts`);

    const cmd = `ffmpeg -i "${inputPath}" -c:v libx264 -c:a aac -b:v ${resolution.bitrate} -vf scale=${resolution.width}:${resolution.height} -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename "${segmentPath}" "${outputPath}"`;

    exec(cmd, (error) => {
      if (error) return reject(error);
      resolve(outputPath);
    });
  });
}

async function uploadToConvex(filePath, uploadUrl) {
  const fileBuffer = fs.readFileSync(filePath);
  const response = await axios.post(uploadUrl, fileBuffer, {
    headers: { "Content-Type": "application/octet-stream" },
  });
  return response.data.storageId;
}

async function transcodeVideo() {
  try {
    console.log(`Starting transcoding for video ${videoId}`);

    // Download the actual video from Convex using the proper API
    console.log(`Downloading video from Convex storage: ${storageId}`);
    const inputPath = `/tmp/input_${Date.now()}.mp4`;

    // Get the proper download URL from Convex
    console.log("Calling getFileUrl API...");
    const urlResponse = await axios.post(
      `http://host.docker.internal:3000/api/getFileUrl`,
      {
        fileId: storageId,
      }
    );

    console.log("API response:", urlResponse.status, urlResponse.data);

    if (urlResponse.status !== 200) {
      throw new Error(
        `Failed to get file URL: ${urlResponse.status} ${JSON.stringify(urlResponse.data)}`
      );
    }

    const videoUrl = urlResponse.data;
    console.log("Downloading from URL:", videoUrl);

    if (!videoUrl) {
      throw new Error("No video URL returned from API");
    }

    const response = await axios.get(videoUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(inputPath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("Video downloaded successfully");

    // Get video info
    const videoInfo = await getVideoInfo(inputPath);
    const outputDir = `/tmp/output_${Date.now()}`;
    fs.mkdirSync(outputDir, { recursive: true });

    // Transcode to multiple resolutions
    const hlsFiles = {};
    for (const resolution of RESOLUTIONS) {
      try {
        const outputPath = await transcodeToHLS(
          inputPath,
          outputDir,
          resolution,
          videoInfo.width,
          videoInfo.height
        );
        if (outputPath) {
          // Save transcoded files locally
          const localDir = `/tmp/transcoded/${videoId}`;
          fs.mkdirSync(localDir, { recursive: true });

          // Copy HLS playlist
          const localPlaylistPath = path.join(
            localDir,
            `${resolution.name}.m3u8`
          );
          fs.copyFileSync(outputPath, localPlaylistPath);

          const fieldName = `p${resolution.name.replace("p", "")}`;
          hlsFiles[fieldName] = localPlaylistPath;

          console.log(`Successfully transcoded ${resolution.name}`);

          // Copy segments
          const segmentFiles = fs
            .readdirSync(outputDir)
            .filter(
              (f) => f.startsWith(`${resolution.name}_`) && f.endsWith(".ts")
            );
          for (const segmentFile of segmentFiles) {
            const segmentPath = path.join(outputDir, segmentFile);
            const localSegmentPath = path.join(localDir, segmentFile);
            fs.copyFileSync(segmentPath, localSegmentPath);
          }
          console.log(
            `Saved ${segmentFiles.length} segments for ${resolution.name}`
          );
        }
      } catch (error) {
        console.error(`Failed to transcode ${resolution.name}:`, error);
      }
    }

    // Notify completion with local file paths
    console.log("Transcoding completed. Files saved locally:", {
      videoId,
      hlsFiles,
      originalResolution: {
        width: videoInfo.width,
        height: videoInfo.height,
      },
    });

    // Call upload API on localhost
    await axios.post(
      `http://host.docker.internal:3000/api/uploadTranscodedFiles`,
      {
        videoId,
        hlsFiles,
        originalResolution: {
          width: videoInfo.width,
          height: videoInfo.height,
        },
      }
    );

    // Cleanup
    fs.unlinkSync(inputPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    console.log(`Transcoding completed for video ${videoId}`);
    process.exit(0);
  } catch (error) {
    console.error("Transcoding failed:", error);
    process.exit(1);
  }
}

transcodeVideo();
