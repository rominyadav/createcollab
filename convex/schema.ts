import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    roles: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  deletedUsers: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    roles: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_deleted_at", ["deletedAt"]),

  videoFeeds: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    videoFileId: v.optional(v.id("_storage")),
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
    // HLS streaming fields
    isTranscoded: v.optional(v.boolean()),
    transcodingStatus: v.optional(v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed"))),
    originalResolution: v.optional(v.object({ width: v.number(), height: v.number() })),
    hlsUrls: v.optional(v.object({
      p360: v.optional(v.id("_storage")),
      p480: v.optional(v.id("_storage")),
      p720: v.optional(v.id("_storage")),
      p1080: v.optional(v.id("_storage")),
      p1440: v.optional(v.id("_storage")),
      p2160: v.optional(v.id("_storage")),
    })),
  })
    .index("by_creator", ["creatorId"])
    .index("by_campaign", ["campaignId"])
    .index("by_type", ["type"])
    .index("by_uploaded_at", ["uploadedAt"]),

  brands: defineTable({
    clerkId: v.string(),
    companyName: v.string(),
    industry: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
    founded: v.optional(v.string()),
    employees: v.optional(v.string()),
    revenue: v.optional(v.string()),
    socialMedia: v.object({
      facebook: v.object({ connected: v.boolean(), accountName: v.optional(v.string()) }),
      instagram: v.object({ connected: v.boolean(), accountName: v.optional(v.string()) }),
      twitter: v.object({ connected: v.boolean(), accountName: v.optional(v.string()) }),
      linkedin: v.object({ connected: v.boolean(), accountName: v.optional(v.string()) }),
    }),
    location: v.object({
      address: v.string(),
      city: v.string(),
      country: v.string(),
      province: v.string(),
    }),
    documents: v.object({
      panNumber: v.optional(v.string()),
      vatNumber: v.optional(v.string()),
      companyRegistration: v.optional(v.string()),
      registrationNumber: v.optional(v.string()),
    }),
    adminUsers: v.array(v.object({
      userId: v.id("users"),
      role: v.string(),
      phone: v.string(),
      isPrimary: v.boolean(),
    })),
    logo: v.optional(v.string()),
    verifyStatus: v.optional(v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected"))),
    isOnboardingComplete: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_company_name", ["companyName"]),

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