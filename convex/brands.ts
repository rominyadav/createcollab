import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBrand = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("brands", {
      ...args,
      verifyStatus: "pending",
      isOnboardingComplete: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getBrandByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("brands")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const getBrandById = query({
  args: { brandId: v.id("brands") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.brandId);
  },
});

export const checkBrandAccess = query({
  args: { brandId: v.id("brands"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const brand = await ctx.db.get(args.brandId);
    if (!brand) return false;
    
    return brand.adminUsers.some(admin => admin.userId === args.userId);
  },
});

export const updateLogo = mutation({
  args: { brandId: v.id("brands"), logoFileId: v.id("_storage") },
  handler: async (ctx, args) => {
    const logoUrl = await ctx.storage.getUrl(args.logoFileId);
    if (!logoUrl) throw new Error("Failed to get logo URL");
    return await ctx.db.patch(args.brandId, {
      logo: logoUrl,
      updatedAt: Date.now(),
    });
  },
});