import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createVideoFeed = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    videoFileId: v.id("_storage"),
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
    return await ctx.db.get(args.id);
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