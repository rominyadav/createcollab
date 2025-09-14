import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBrand = mutation({
  args: {
    userId: v.id("users"),
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingBrand = await ctx.db
      .query("brands")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingBrand) {
      return existingBrand._id;
    }

    const now = Date.now();
    return await ctx.db.insert("brands", {
      ...args,
      status: "pending",
      verified: false,
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

export const updateBrandProfile = mutation({
  args: {
    clerkId: v.string(),
    industry: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
    founded: v.optional(v.string()),
    employees: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!brand) {
      throw new Error("Brand not found");
    }

    const { clerkId, ...updateData } = args;
    await ctx.db.patch(brand._id, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return brand._id;
  },
});