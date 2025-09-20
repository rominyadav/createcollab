import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    roles: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const now = Date.now();
    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      avatar: args.avatar,
      roles: args.roles || ["creator"], // Use provided roles or default to creator
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const deleteUser = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) return null;

    await ctx.db.insert("deletedUsers", {
      clerkId: user.clerkId,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: Date.now(),
    });

    await ctx.db.delete(user._id);
    return user._id;
  },
});

export const updateAvatar = mutation({
  args: { userId: v.id("users"), avatarFileId: v.id("_storage") },
  handler: async (ctx, args) => {
    const avatarUrl = await ctx.storage.getUrl(args.avatarFileId);
    if (!avatarUrl) throw new Error("Failed to get avatar URL");
    return await ctx.db.patch(args.userId, {
      avatar: avatarUrl,
      updatedAt: Date.now(),
    });
  },
});

