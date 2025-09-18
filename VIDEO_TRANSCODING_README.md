# Video Transcoding & HLS Streaming Setup

## Overview

This system provides automatic video transcoding to multiple resolutions with HLS streaming support and adaptive bitrate streaming.

## Features

- **Automatic Transcoding**: Videos are automatically transcoded to multiple resolutions (2160p, 1440p, 1080p, 720p, 480p, 360p)
- **Smart Resolution Selection**: Only creates resolutions up to the original video quality
- **HLS Streaming**: Generates HLS playlists for adaptive streaming
- **Bandwidth Detection**: Automatically selects optimal resolution based on connection speed
- **Device Optimization**: Adjusts quality based on device type (mobile/desktop)
- **Manual Quality Control**: Users can manually select video quality
- **Robust Event Handling**: Only processes video files, prevents transcoding loops

## Architecture

### Components

1. **Transcoder Service** (`docker/transcoder/`): Lightweight Alpine-based container with FFmpeg
2. **HLS Video Player** (`src/components/user-ui/hls-video-player.tsx`): Advanced player with adaptive streaming
3. **Convex Integration**: Database schema and functions for HLS management
4. **API Routes**: Next.js API for triggering transcoding

### Workflow

1. User uploads video → Video saved to Convex storage
2. Upload triggers transcoding API → Spins up Docker container
3. Container downloads video → Transcodes to multiple resolutions
4. HLS files uploaded to Convex → Container destroyed
5. Video player automatically uses best quality → User can manually adjust

## Setup Instructions

### 1. Build Transcoder Image

```bash
npm run transcoder:build
```

### 2. Start Services

```bash
# Start all services (app + transcoder)
npm run services:up

# Or start transcoder only
npm run transcoder:run
```

### 3. Environment Variables

Add to `.env.local`:

```
TRANSCODER_SERVICE_URL=http://localhost:3001
```

### 4. Install Dependencies

```bash
npm install
```

## Usage

### Video Upload

- Upload any video format (mp4, avi, mov, wmv, flv, webm, mkv)
- System automatically detects video files and triggers transcoding
- Non-video files are ignored

### Video Playback

- HLS player automatically selects optimal resolution
- Manual quality selection available via settings menu
- Supports fullscreen, volume control, play/pause
- Adaptive streaming based on bandwidth

### Resolution Logic

- **4K Video**: Transcoded to all resolutions (360p → 2160p)
- **1080p Video**: Transcoded to 360p → 1080p (no higher resolutions)
- **720p Video**: Transcoded to 360p → 720p
- And so on...

## File Structure

```
docker/transcoder/          # Transcoding service
├── Dockerfile             # Alpine + FFmpeg image
├── package.json          # Node.js dependencies
└── index.js              # Transcoding logic

src/components/user-ui/
├── hls-video-player.tsx  # Advanced HLS player
├── video-modal.tsx       # Full-screen video modal
└── video-upload.tsx      # Updated upload component

convex/
├── schema.ts             # Updated with HLS fields
├── transcoding.ts        # Transcoding functions
└── videoFeeds.ts         # Updated video functions

src/app/api/transcode/    # API route for triggering transcoding
```

## Docker Configuration

### Transcoder Service

- **Base Image**: Alpine Linux 3.18 (lightweight)
- **Dependencies**: FFmpeg, Node.js, npm
- **Ports**: 3000 (mapped to 3001 on host)
- **Volumes**: `/tmp` for temporary file processing
- **Auto-restart**: Unless stopped

### FFmpeg Settings

- **Video Codec**: H.264 (libx264)
- **Audio Codec**: AAC
- **HLS Segment**: 10 seconds
- **Bitrates**: Optimized per resolution
  - 2160p: 15000k
  - 1440p: 8000k
  - 1080p: 5000k
  - 720p: 2500k
  - 480p: 1000k
  - 360p: 600k

## Monitoring & Debugging

### Check Transcoder Status

```bash
docker ps | grep transcoder
```

### View Transcoder Logs

```bash
docker logs <transcoder-container-id>
```

### Test Transcoding Endpoint

```bash
curl -X POST http://localhost:3001/transcode \
  -H "Content-Type: application/json" \
  -d '{"videoUrl":"<video-url>","videoId":"<video-id>","convexUrl":"<convex-url>"}'
```

## Performance Considerations

### Transcoding Performance

- Uses hardware acceleration when available
- Processes resolutions in parallel
- Automatic cleanup of temporary files
- Container auto-destruction after processing

### Storage Optimization

- HLS segments stored efficiently in Convex
- Original video preserved for quality reference
- Thumbnail generation for quick previews

### Network Optimization

- Adaptive bitrate streaming reduces bandwidth usage
- Progressive download for smooth playback
- Automatic quality adjustment based on connection

## Troubleshooting

### Common Issues

1. **Transcoding Fails**: Check Docker container logs and FFmpeg installation
2. **No HLS Playback**: Verify HLS URLs in database and file accessibility
3. **Quality Not Switching**: Check network connection detection and player logic
4. **Container Won't Start**: Ensure port 3001 is available and Docker is running

### Debug Commands

```bash
# Check transcoder service
curl http://localhost:3001/health

# View container logs
docker logs video-transcoder

# Test video info extraction
ffprobe -v quiet -print_format json -show_format -show_streams video.mp4
```

## Security Considerations

- Input validation for video files only
- Temporary file cleanup after processing
- Container isolation for transcoding
- No direct file system access from web interface
- Rate limiting on transcoding API (recommended for production)
