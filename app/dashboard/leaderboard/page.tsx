'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Award,
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  gender: 'male' | 'female';
  points: number;
  rank: number;
  achievements: {
    name: string;
    icon: string;
    date: string;
  }[];
  stats: {
    applications: number;
    interviews: number;
    offers: number;
  };
  profile_image: string;
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  // Fetch leaderboard data
  const { data: leaderboardData } = useQuery({
    queryKey: ['leaderboard', timeframe],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('timeframe', timeframe)
        .order('points', { ascending: false });

      if (error) throw error;
      return data as LeaderboardEntry[];
    },
  });

  // Group entries by gender
  const maleEntries = leaderboardData?.filter(entry => entry.gender === 'male') || [];
  const femaleEntries = leaderboardData?.filter(entry => entry.gender === 'female') || [];

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Male Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Male Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maleEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-4 border rounded-lg flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    {index < 3 ? (
                      <div className="absolute -top-2 -left-2">
                        {index === 0 ? (
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        ) : index === 1 ? (
                          <Medal className="h-6 w-6 text-gray-400" />
                        ) : (
                          <Award className="h-6 w-6 text-amber-600" />
                        )}
                      </div>
                    ) : null}
                    <img
                      src={entry.profile_image}
                      alt={entry.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{entry.name}</h3>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{entry.points}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {entry.stats.applications} applications
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {entry.stats.interviews} interviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Female Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pink-500" />
              Female Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {femaleEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-4 border rounded-lg flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    {index < 3 ? (
                      <div className="absolute -top-2 -left-2">
                        {index === 0 ? (
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        ) : index === 1 ? (
                          <Medal className="h-6 w-6 text-gray-400" />
                        ) : (
                          <Award className="h-6 w-6 text-amber-600" />
                        )}
                      </div>
                    ) : null}
                    <img
                      src={entry.profile_image}
                      alt={entry.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{entry.name}</h3>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{entry.points}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {entry.stats.applications} applications
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {entry.stats.interviews} interviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeframe Toggle */}
      <div className="mt-6 flex justify-center">
        <Tabs
          defaultValue="monthly"
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as 'monthly' | 'yearly')}
        >
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
} 