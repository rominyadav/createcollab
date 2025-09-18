import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createVideoFeed = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    videoFileId: v.optional(v.id("_storage")),
    thumbnailFileId: v.optional(v.id("_storage")),
    videoUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    duration: v.string(),
    creatorId: v.string(),
    creatorName: v.string(),
    creatorAvatar: v.string(),
    aspectRatio: v.string(),
    category: v.string(),
    campaignId: v.optional(v.id("campaigns")),
    campaignName: v.optional(v.string()),
    type: v.union(v.literal("public"), v.literal("campaign")),
  },
  handler: async (ctx, args) => {
    const videoId = await ctx.db.insert("videoFeeds", {
      ...args,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      uploadedAt: Date.now(),
      isPublic: args.type === "public",
      isTranscoded: false,
      transcodingStatus: "pending",
    });
    return videoId;
  },
});

export const getVideoFeeds = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    
    let query = ctx.db
      .query("videoFeeds")
      .withIndex("by_uploaded_at")
      .order("desc");
    
    if (args.cursor) {
      const cursorTime = parseInt(args.cursor);
      query = query.filter((q) => q.lt(q.field("uploadedAt"), cursorTime));
    }
    
    const videos = await query.take(limit);
    
    return {
      videos,
      nextCursor: videos.length === limit ? videos[videos.length - 1].uploadedAt.toString() : null,
    };
  },
});

export const getVideoById = query({
  args: { id: v.id("videoFeeds") },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.id);
    if (video) {
      console.log('getVideoById:', {
        id: args.id,
        title: video.title,
        isTranscoded: video.isTranscoded,
        hlsUrls: video.hlsUrls
      });
    }
    return video;
  },
});

export const incrementViews = mutation({
  args: { id: v.id("videoFeeds") },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.id);
    if (!video) return null;
    
    await ctx.db.patch(args.id, {
      views: video.views + 1,
    });
    
    return video.views + 1;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});

export const toggleLike = mutation({
  args: { 
    videoId: v.id("videoFeeds"),
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.videoId);
    if (!video) return null;
    
    // Check if user already liked this video
    const existingLike = await ctx.db
      .query("videoLikes")
      .withIndex("by_user_video", (q) => 
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .first();
    
    if (existingLike) {
      // Unlike: remove like and decrement count
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.videoId, {
        likes: Math.max(0, video.likes - 1)
      });
      return { liked: false, count: Math.max(0, video.likes - 1) };
    } else {
      // Like: add like and increment count
      await ctx.db.insert("videoLikes", {
        userId: args.userId,
        videoId: args.videoId,
        createdAt: Date.now()
      });
      await ctx.db.patch(args.videoId, {
        likes: video.likes + 1
      });
      return { liked: true, count: video.likes + 1 };
    }
  },
});

export const checkUserLike = query({
  args: {
    videoId: v.id("videoFeeds"),
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const like = await ctx.db
      .query("videoLikes")
      .withIndex("by_user_video", (q) => 
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .first();
    return !!like;
  },
});

export const updateTranscodingStatus = mutation({
  args: {
    videoId: v.string(),
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed"))
  },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.videoId as any);
    if (!video) return null;
    
    await ctx.db.patch(args.videoId as any, {
      transcodingStatus: args.status
    });
    return true;
  },
});



export const triggerTranscoding = mutation({
  args: { videoId: v.id("videoFeeds") },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.videoId);
    if (!video || video.isTranscoded || video.transcodingStatus === "processing") {
      return { success: false, message: "Video already transcoded or processing" };
    }
    
    // Check if file is a video by checking the URL or file extension
    const isVideo = video.videoUrl.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv|m4v)$/i);
    if (!isVideo) {
      return { success: false, message: "File is not a video" };
    }
    
    await ctx.db.patch(args.videoId, {
      transcodingStatus: "pending"
    });
    
    return { success: true, videoUrl: video.videoUrl, videoId: args.videoId };
  },
});

export const completeTranscoding = mutation({
  args: {
    videoId: v.id("videoFeeds"),
    hlsUrls: v.object({
      p360: v.optional(v.id("_storage")),
      p480: v.optional(v.id("_storage")),
      p720: v.optional(v.id("_storage")),
      p1080: v.optional(v.id("_storage")),
      p1440: v.optional(v.id("_storage")),
      p2160: v.optional(v.id("_storage")),
    }),
    originalResolution: v.object({ width: v.number(), height: v.number() })
  },
  handler: async (ctx, args) => {
    console.log('completeTranscoding called with:', args);
    
    const video = await ctx.db.get(args.videoId);
    if (!video) {
      console.log('Video not found:', args.videoId);
      return { success: false, message: "Video not found" };
    }
    
    console.log('Found video:', video.title);
    console.log('Updating with HLS URLs:', args.hlsUrls);
    
    // Update video with HLS URLs
    await ctx.db.patch(args.videoId, {
      hlsUrls: args.hlsUrls,
      originalResolution: args.originalResolution,
      isTranscoded: true,
      transcodingStatus: "completed"
    });
    
    console.log('Video updated successfully');
    
    // Delete raw video file but keep videoFileId for now
    try {
      if (video.videoFileId) {
        await ctx.storage.delete(video.videoFileId);
        console.log('Raw video deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete raw video:', error);
    }
    
    return { success: true, message: "Transcoding completed and raw video deleted" };
  },
});