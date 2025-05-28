import { Suspense } from 'react';
import JobsPageClient from './JobsPageClient';

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsPageClient />
    </Suspense>
  );
}
