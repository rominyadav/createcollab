"use client";

import { useParams } from "next/navigation";

import { CreatorDashboard } from "@/components/creator/creator-dashboard";
import { Creator } from "@/components/mock-data/creator-mockdata";
import creatorMockData from "@/components/mock-data/creator-mockdata.json";

export default function CreatorPage() {
  const params = useParams();
  const creatorId = parseInt(params.id as string);

  // Find creator by ID
  const creator = creatorMockData.find((c: Creator) => c.id === creatorId);

  if (!creator) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="mb-4 text-4xl">🚫</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Creator Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The creator profile you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return <CreatorDashboard creator={creator} />;
}
