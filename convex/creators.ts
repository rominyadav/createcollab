import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCreator = mutation({
  args: {
    userId: v.id("users"),
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingCreator = await ctx.db
      .query("creators")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingCreator) {
      return existingCreator;
    }

    const uuid = crypto.randomUUID();
    const now = Date.now();
    const creatorId = await ctx.db.insert("creators", {
      ...args,
      uuid,
      status: "pending",
      verified: false,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(creatorId);
  },
});

export const getCreatorByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("creators")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const updateCreatorProfile = mutation({
  args: {
    clerkId: v.string(),
    bio: v.optional(v.string()),
    niche: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.string())),
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
  },
  handler: async (ctx, args) => {
    const creator = await ctx.db
      .query("creators")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!creator) {
      throw new Error("Creator not found");
    }

    const { clerkId, ...updateData } = args;
    await ctx.db.patch(creator._id, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(creator._id);
  },
});