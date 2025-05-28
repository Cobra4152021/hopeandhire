'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function LeaderboardPage() {
  const monthlyLeaders = [
    {
      name: 'Ken Lomba',
      image: '/Ken.jpg',
      points: 1200,
    },
    {
      name: 'Mark Lu',
      image: '/team-member-1.jpg',
      points: 1100,
    },
    {
      name: 'Terry Uyeda',
      image: '/team-member-2.jpg',
      points: 1000,
    },
  ];

  const yearlyLeaders = [
    {
      name: 'Ken Lomba',
      image: '/Ken.jpg',
      points: 12000,
    },
    {
      name: 'Mark Lu',
      image: '/team-member-3.jpg',
      points: 11000,
    },
    {
      name: 'Terry Uyeda',
      image: '/team-member-4.png',
      points: 10000,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Volunteer Leaderboard</h1>

      <div className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Monthly Leaders</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {monthlyLeaders.map((leader, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                    </div>
                    <CardTitle className="text-lg">{leader.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal">{leader.points} pts</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Yearly Leaders</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {yearlyLeaders.map((leader, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                    </div>
                    <CardTitle className="text-lg">{leader.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal">{leader.points} pts</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
