import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton() {
  return (
    <Card className="flex h-32 px-4">
      <Skeleton className="mt-1 h-7 w-72" />

      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-42" />
      </div>
    </Card>
  );
}
