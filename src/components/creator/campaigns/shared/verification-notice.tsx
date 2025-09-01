"use client";

import { Clock } from "lucide-react";

interface VerificationNoticeProps {
  isVerified: boolean;
}

export function VerificationNotice({ isVerified }: VerificationNoticeProps) {
  if (isVerified) return null;

  return (
    <div className="fixed right-4 bottom-20 left-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 md:right-8 md:left-72 dark:border-yellow-800 dark:bg-yellow-900/20">
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          Complete verification to view campaign details and apply
        </p>
      </div>
    </div>
  );
}
