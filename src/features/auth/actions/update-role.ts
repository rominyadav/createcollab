"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

async function assignRole(role: string) {
  const user = await currentUser();
  const client = await clerkClient();

  if (user) {
    if (user.publicMetadata.role && user.publicMetadata.role === role) {
      return;
    }

    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role,
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
