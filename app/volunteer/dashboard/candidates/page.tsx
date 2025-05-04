import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function CandidatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
        <p className="text-muted-foreground">Browse and manage candidates seeking employment opportunities.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search candidates by name or skills..." className="pl-10" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="job-ready">Job Ready</SelectItem>
              <SelectItem value="placed">Placed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="customer-service">Customer Service</SelectItem>
              <SelectItem value="food-service">Food Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="job-ready">Job Ready</TabsTrigger>
          <TabsTrigger value="matched">Matched</TabsTrigger>
          <TabsTrigger value="placed">Placed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
