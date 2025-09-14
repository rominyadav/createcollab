import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    roles: v.array(v.union(v.literal("creator"), v.literal("brand"), v.literal("moderator"))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  creators: defineTable({
    userId: v.id("users"),
    clerkId: v.string(),
    uuid: v.string(),
    name: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    niche: v.optional(v.string()),
    followers: v.optional(v.string()),
    following: v.optional(v.string()),
    engagement: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.string())),
    pricing: v.optional(v.object({
      sec15: v.optional(v.object({
        type: v.union(v.literal("fixed"), v.literal("range")),
        amount: v.optional(v.number()),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
      })),
      sec30: v.optional(v.object({
        type: v.union(v.literal("fixed"), v.literal("range")),
        amount: v.optional(v.number()),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
      })),
      sec60: v.optional(v.object({
        type: v.union(v.literal("fixed"), v.literal("range")),
        amount: v.optional(v.number()),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
      })),
      min1to5: v.optional(v.object({
        type: v.union(v.literal("fixed"), v.literal("range")),
        amount: v.optional(v.number()),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
      })),
      min5plus: v.optional(v.object({
        type: v.union(v.literal("fixed"), v.literal("range")),
        amount: v.optional(v.number()),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
      })),
    })),
    address: v.optional(v.object({
      street: v.optional(v.string()),
      city: v.optional(v.string()),
      province: v.optional(v.string()),
      country: v.optional(v.string()),
      zipCode: v.optional(v.string()),
    })),
    phoneNumber: v.optional(v.string()),
    legalName: v.optional(v.string()),
    panCard: v.optional(v.string()),
    paymentVerification: v.optional(v.object({
      khalti: v.optional(v.string()),
      esewa: v.optional(v.string()),
      verified: v.boolean(),
    })),
    creatorScore: v.optional(v.number()),
    profileCompletion: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    verified: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_status", ["status"]),

  brands: defineTable({
    userId: v.id("users"),
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    logo: v.optional(v.string()),
    industry: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
    founded: v.optional(v.string()),
    employees: v.optional(v.string()),
    revenue: v.optional(v.string()),
    location: v.optional(v.object({
      address: v.optional(v.string()),
      city: v.optional(v.string()),
      state: v.optional(v.string()),
      country: v.optional(v.string()),
      district: v.optional(v.string()),
      province: v.optional(v.string()),
      coordinates: v.optional(v.object({
        lat: v.number(),
        lng: v.number(),
      })),
    })),
    documents: v.optional(v.object({
      panNumber: v.optional(v.string()),
      vatNumber: v.optional(v.string()),
      companyRegistration: v.optional(v.string()),
      registrationNumber: v.optional(v.string()),
    })),
    adminUsers: v.optional(v.array(v.object({
      id: v.number(),
      creatorId: v.optional(v.number()),
      name: v.string(),
      email: v.string(),
      role: v.string(),
      phone: v.optional(v.string()),
      avatar: v.optional(v.string()),
      isPrimary: v.boolean(),
    }))),
    billing: v.optional(v.object({
      plan: v.optional(v.string()),
      subscriptionType: v.optional(v.string()),
      subscriptionExpiry: v.optional(v.string()),
      monthlyAmount: v.optional(v.number()),
      currency: v.optional(v.string()),
      paymentMethod: v.optional(v.string()),
      lastBillingDate: v.optional(v.string()),
      nextBillingDate: v.optional(v.string()),
    })),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    verified: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_status", ["status"]),
});