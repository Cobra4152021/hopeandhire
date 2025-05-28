'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LeaderboardPage() {
  const exampleVolunteers = [
    { name: 'Alice Smith', score: 95, reviews: 120 },
    { name: 'Bob Johnson', score: 88, reviews: 95 },
    { name: 'Charlie Brown', score: 82, reviews: 78 },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Volunteer Recruiter Leaderboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exampleVolunteers.map((volunteer, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{volunteer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Score: {volunteer.score}</p>
              <p>Reviews: {volunteer.reviews}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
