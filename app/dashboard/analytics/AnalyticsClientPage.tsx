'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, FileText, Calendar } from 'lucide-react';

// Sample data for charts
const applicationData = [
  { name: 'Jan', applications: 65, interviews: 28, hires: 12 },
  { name: 'Feb', applications: 59, interviews: 24, hires: 10 },
  { name: 'Mar', applications: 80, interviews: 35, hires: 15 },
  { name: 'Apr', applications: 81, interviews: 40, hires: 18 },
  { name: 'May', applications: 56, interviews: 29, hires: 14 },
  { name: 'Jun', applications: 55, interviews: 25, hires: 11 },
  { name: 'Jul', applications: 40, interviews: 18, hires: 8 },
];

const sourceData = [
  { name: 'Job Boards', value: 45 },
  { name: 'Referrals', value: 25 },
  { name: 'Company Website', value: 15 },
  { name: 'Social Media', value: 10 },
  { name: 'Other', value: 5 },
];

const timeToHireData = [
  { name: 'Software Dev', days: 35 },
  { name: 'Marketing', days: 28 },
  { name: 'Sales', days: 21 },
  { name: 'Customer Svc', days: 14 },
  { name: 'Admin', days: 18 },
];

const retentionData = [
  { name: '3 months', rate: 95 },
  { name: '6 months', rate: 88 },
  { name: '9 months', rate: 82 },
  { name: '12 months', rate: 75 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsClientPage() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Track your hiring metrics and performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-teal" />
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">12%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Total Applications</p>
              <h3 className="text-2xl font-bold text-gray-900">436</h3>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-yellow-light/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow" />
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">8%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Interviews Conducted</p>
              <h3 className="text-2xl font-bold text-gray-900">199</h3>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-teal" />
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">15%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">New Hires</p>
              <h3 className="text-2xl font-bold text-gray-900">88</h3>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-yellow-light/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-yellow" />
              </div>
              <div className="flex items-center">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">3%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Time to Hire (Avg)</p>
              <h3 className="text-2xl font-bold text-gray-900">24 days</h3>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="hiring">Hiring</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
                <CardDescription>Applications, interviews, and hires over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={applicationData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#0ea5e9" name="Applications" />
                      <Bar dataKey="interviews" fill="#14b8a6" name="Interviews" />
                      <Bar dataKey="hires" fill="#eab308" name="Hires" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Sources</CardTitle>
                <CardDescription>Where your candidates are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Number of applications over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={applicationData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      stroke="#0ea5e9"
                      fill="#0ea5e9"
                      fillOpacity={0.3}
                      name="Applications"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hiring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Time to Hire by Department</CardTitle>
              <CardDescription>Average days to hire by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeToHireData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="days" fill="#14b8a6" name="Days to Hire" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Retention</CardTitle>
              <CardDescription>Retention rates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={retentionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#eab308"
                      activeDot={{ r: 8 }}
                      name="Retention Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
