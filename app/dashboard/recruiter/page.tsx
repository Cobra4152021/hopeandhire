import { Suspense } from 'react';
import RecruiterDashboardClient from './RecruiterDashboardClient';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecruiterDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      }
    >
      <RecruiterDashboardClient />
    </Suspense>
  );
}
