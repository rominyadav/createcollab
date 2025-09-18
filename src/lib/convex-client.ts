import { ConvexHttpClient } from "convex/browser";

export const convexClient = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export const getConvexFileUrl = (storageId: string) => {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${storageId}`;
};
