import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/user-ui/loading-spinner";

export function LoadingState() {
  return (
    <div className="flex justify-center py-8">
      <div className="text-muted-foreground flex items-center gap-2">
        <LoadingSpinner />
        <span className="text-sm font-medium">Loading more videos...</span>
      </div>
    </div>
  );
}

export function EndOfContent() {
  return (
    <Card className="mx-4">
      <CardContent className="flex justify-center py-8">
        <div className="text-muted-foreground text-center">
          <div className="mb-2 text-2xl">🎬</div>
          <p className="text-sm font-medium">You&apos;ve reached the end!</p>
          <Badge variant="secondary" className="mt-2">
            No more videos to load
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmptyState() {
  return (
    <Card className="mx-4">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 text-6xl">🎬</div>
        <h3 className="mb-2 text-lg font-semibold">No videos yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Start following creators or check back later for new content
        </p>
      </CardContent>
    </Card>
  );
}
