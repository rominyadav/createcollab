import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  videoFeeds: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    videoFileId: v.id("_storage"),
    thumbnailFileId: v.optional(v.id("_storage")),
    videoUrl: v.string(), // Public URL from Convex storage
    thumbnailUrl: v.optional(v.string()),
    duration: v.string(),
    views: v.number(),
    likes: v.number(),
    comments: v.number(),
    shares: v.number(),
    creatorId: v.string(), // Clerk user ID
    creatorName: v.string(),
    creatorAvatar: v.string(),
    uploadedAt: v.number(), // timestamp
    aspectRatio: v.string(),
    category: v.string(),
    isPublic: v.boolean(),
    campaignId: v.optional(v.id("campaigns")),
    campaignName: v.optional(v.string()),
    type: v.union(v.literal("public"), v.literal("campaign")),
  })
    .index("by_creator", ["creatorId"])
    .index("by_campaign", ["campaignId"])
    .index("by_type", ["type"])
    .index("by_uploaded_at", ["uploadedAt"]),

  campaigns: defineTable({
    name: v.string(),
    brandId: v.string(),
    description: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_brand", ["brandId"]),

  videoLikes: defineTable({
    userId: v.string(),
    videoId: v.id("videoFeeds"),
    createdAt: v.number(),
  })
    .index("by_user_video", ["userId", "videoId"])
    .index("by_video", ["videoId"]),
});