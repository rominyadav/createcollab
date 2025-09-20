"use client";

import { useState } from "react";

import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

export function ManualDeleteUser() {
  const [clerkId, setClerkId] = useState("");
  const deleteUser = useMutation(api.users.deleteUser);

  const handleDelete = async () => {
    if (!clerkId.trim()) {
      alert("Please enter a Clerk ID");
      return;
    }

    try {
      await deleteUser({ clerkId: clerkId.trim() });
      alert(`User ${clerkId} moved to deletedUsers table`);
      setClerkId("");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter Clerk ID"
        value={clerkId}
        onChange={(e) => setClerkId(e.target.value)}
        className="rounded border px-3 py-2"
      />
      <Button onClick={handleDelete} variant="destructive">
        Move to Deleted
      </Button>
    </div>
  );
}
