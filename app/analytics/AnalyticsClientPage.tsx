'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample analytics data
const analyticsData = {
  jobSeekers: {
    total: 1250,
    growth: 15,
    byMonth: [120, 145, 160, 175, 190, 210, 230, 250, 270, 290, 310, 350],
    byStatus: [
      { name: 'Active', value: 850 },
      { name: 'Employed', value: 320 },
      { name: 'Inactive', value: 80 },
    ],
  },
  employers: {
    total: 85,
    growth: 8,
    byMonth: [10, 12, 15, 18, 22, 25, 30, 35, 40, 45, 50, 55],
    byIndustry: [
      { name: 'Technology', value: 30 },
      { name: 'Healthcare', value: 15 },
      { name: 'Finance', value: 12 },
      { name: 'Education', value: 10 },
      { name: 'Manufacturing', value: 8 },
      { name: 'Other', value: 10 },
    ],
  },
  volunteers: {
    total: 45,
    growth: 12,
    byMonth: [5, 7, 8, 10, 12, 15, 18, 20, 25, 30, 35, 40],
    bySpecialty: [
      { name: 'Resume Review', value: 25 },
      { name: 'Interview Coaching', value: 20 },
      { name: 'Career Counseling', value: 15 },
      { name: 'Job Search Strategy', value: 10 },
      { name: 'Salary Negotiation', value: 5 },
    ],
  },
  jobs: {
    total: 320,
    growth: 22,
    byMonth: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
    byType: [
      { name: 'Full-time', value: 220 },
      { name: 'Part-time', value: 50 },
      { name: 'Contract', value: 35 },
      { name: 'Internship', value: 15 },
    ],
  },
  appointments: {
    total: 580,
    growth: 18,
    byMonth: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
    byType: [
      { name: 'Resume Review', value: 250 },
      { name: 'Mock Interview', value: 180 },
      { name: 'Career Counseling', value: 100 },
      { name: 'Job Search Strategy', value: 50 },
    ],
  },
  placements: {
    total: 210,
    growth: 25,
    byMonth: [8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35],
    byIndustry: [
      { name: 'Technology', value: 85 },
      { name: 'Healthcare', value: 45 },
      { name: 'Finance', value: 30 },
      { name: 'Education', value: 20 },
      { name: 'Manufacturing', value: 15 },
      { name: 'Other', value: 15 },
    ],
  },
};

export default function AnalyticsClientPage() {
  const [timeRange, setTimeRange] = useState('year');

  const renderGrowthIndicator = (growth: number) => {
    const isPositive = growth >= 0;
    return (
      <div
        className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${isPositive ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <span className="ml-1">{Math.abs(growth)}%</span>
      </div>
    );
  };

  const renderBarChart = (data: number[]) => {
    const max = Math.max(...data);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return (
      <div className="mt-4">
        <div className="flex items-end h-40 space-x-2">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-teal rounded-t"
                style={{ height: `${(value / max) * 100}%` }}
              ></div>
              <span className="text-xs mt-1 text-gray-500">
                {months[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = (data: { name: string; value: number }[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const colors = [
      'bg-teal',
      'bg-teal-light',
      'bg-yellow',
      'bg-yellow-light',
      'bg-teal-dark',
      'bg-yellow-dark',
    ];

    return (
      <div className="mt-4 flex flex-col md:flex-row items-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const previousPercentages = data
                .slice(0, index)
                .reduce(
                  (sum, prevItem) => sum + (prevItem.value / total) * 100,
                  0
                );

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[index % colors.length].replace('bg-', '')}
                  strokeWidth="20"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={`${-previousPercentages}`}
                  transform="rotate(-90 50 50)"
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-4 md:mt-0 md:ml-6 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-2`}
              ></div>
              <span className="text-sm text-gray-700">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal">
        Analytics Dashboard
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-dark-text">
              Platform Overview
            </h2>

            <div>
              <Select
                value={timeRange}
                onValueChange={(value) => setTimeRange(value)}
              >
                <SelectTrigger className="w-[180px] border-teal-light/30">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-teal">Job Seekers</h3>
                <p className="text-3xl font-bold mt-2 text-dark-text">
                  {analyticsData.jobSeekers.total}
                </p>
              </div>
              {renderGrowthIndicator(analyticsData.jobSeekers.growth)}
            </div>
            {renderBarChart(analyticsData.jobSeekers.byMonth)}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-teal">Employers</h3>
                <p className="text-3xl font-bold mt-2 text-dark-text">
                  {analyticsData.employers.total}
                </p>
              </div>
              {renderGrowthIndicator(analyticsData.employers.growth)}
            </div>
            {renderBarChart(analyticsData.employers.byMonth)}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-teal">Volunteers</h3>
                <p className="text-3xl font-bold mt-2 text-dark-text">
                  {analyticsData.volunteers.total}
                </p>
              </div>
              {renderGrowthIndicator(analyticsData.volunteers.growth)}
            </div>
            {renderBarChart(analyticsData.volunteers.byMonth)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-teal">
                  Job Postings
                </h3>
                <p className="text-3xl font-bold mt-2 text-dark-text">
                  {analyticsData.jobs.total}
                </p>
              </div>
              {renderGrowthIndicator(analyticsData.jobs.growth)}
            </div>
            {renderPieChart(analyticsData.jobs.byType)}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-teal">
                  Appointments
                </h3>
                <p className="text-3xl font-bold mt-2 text-dark-text">
                  {analyticsData.appointments.total}
                </p>
              </div>
              {renderGrowthIndicator(analyticsData.appointments.growth)}
            </div>
            {renderPieChart(analyticsData.appointments.byType)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-teal">
                Successful Placements
              </h3>
              <p className="text-3xl font-bold mt-2 text-dark-text">
                {analyticsData.placements.total}
              </p>
            </div>
            {renderGrowthIndicator(analyticsData.placements.growth)}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              By Industry
            </h4>
            {renderPieChart(analyticsData.placements.byIndustry)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-teal-light/20">
          <h3 className="text-lg font-semibold text-teal mb-4">Key Insights</h3>

          <div className="space-y-4">
            <div className="p-4 bg-teal-light/10 rounded-lg border border-teal-light/20">
              <h4 className="font-medium text-teal">Growing Volunteer Base</h4>
              <p className="text-gray-700 mt-1">
                Our volunteer base has grown by{' '}
                {analyticsData.volunteers.growth}% in the last year, allowing us
                to provide more personalized support to job seekers.
              </p>
            </div>

            <div className="p-4 bg-teal-light/10 rounded-lg border border-teal-light/20">
              <h4 className="font-medium text-teal">Successful Placements</h4>
              <p className="text-gray-700 mt-1">
                We&apos;ve helped {analyticsData.placements.total} job seekers
                find employment, with a {analyticsData.placements.growth}%
                increase in successful placements compared to last year.
              </p>
            </div>

            <div className="p-4 bg-teal-light/10 rounded-lg border border-teal-light/20">
              <h4 className="font-medium text-teal">Popular Services</h4>
              <p className="text-gray-700 mt-1">
                Resume reviews continue to be our most requested service,
                followed by mock interviews and career counseling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
