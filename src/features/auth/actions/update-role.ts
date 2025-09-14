"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

async function assignRole(role: string) {
  const user = await currentUser();
  const client = await clerkClient();

  if (user) {
    const currentRoles = (user.publicMetadata.roles as string[]) || [];

    if (currentRoles.includes(role)) {
      return;
    }

    const updatedRoles = [...new Set([...currentRoles, role])];

    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        ...user.publicMetadata,
        role, // Primary role
        roles: updatedRoles, // All roles
      },
    });
  } else {
    throw new Error("User not found");
  }
}

export async function assignBrandRole() {
  return assignRole("brand");
}

export async function assignCreatorRole() {
  return assignRole("creator");
}

export async function assignModeratorRole() {
  return assignRole("moderator");
}

export async function switchRole(role: "creator" | "brand" | "moderator") {
  const user = await currentUser();
  const client = await clerkClient();

  if (user) {
    const userRoles = (user.publicMetadata.roles as string[]) || [];

    if (!userRoles.includes(role)) {
      throw new Error("User does not have access to this role");
    }

    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        ...user.publicMetadata,
        role, // Switch primary role
      },
    });
  } else {
    throw new Error("User not found");
  }
}
