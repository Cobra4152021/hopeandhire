"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Briefcase, MapPin, Clock, Users, ArrowLeft, Pencil, CheckCircle, XCircle } from "lucide-react";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  is_remote: boolean;
  job_type: string;
  salary_min: number;
  salary_max: number;
  created_at: string;
  updated_at: string;
  company_id: string;
  status: "active" | "draft" | "closed";
  requirements?: string[];
  benefits?: string[];
  company_name?: string;
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!jobId) throw new Error("Job ID is required");

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("You must be logged in to view job details");

        const { data, error } = await supabase.from("job_listings").select("*").eq("id", jobId).single();
        if (error) throw error;
        if (!data) throw new Error("Job not found");

        const { data: companyData, error: companyError } = await supabase
          .from("companies")
          .select("name")
          .eq("id", data.company_id)
          .single();

        if (companyError && companyError.code !== "PGRST116") throw companyError;

        setJob({ ...data, company_name: companyData?.name || "Your Company" });
      } catch (error) {
        console.error("Error fetching job:", error);
        toast({
          title: "Error loading job",
          description: error instanceof Error ? error.message : "There was a problem loading the job details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [params.id, toast]);

  const handleStatusChange = async (newStatus: Job["status"]) => {
    if (!job) return;
    try {
      const { error } = await supabase
        .from("job_listings")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", job.id);

      if (error) throw error;

      setJob({ ...job, status: newStatus });

      toast({
        title: `Job ${newStatus === "active" ? "published" : newStatus === "draft" ? "unpublished" : "closed"}`,
        description: `The job posting has been ${
          newStatus === "active" ? "published" : newStatus === "draft" ? "saved as a draft" : "marked as closed"
        }.`,
      });
    } catch (error) {
      console.error("Error updating job status:", error);
      toast({
        title: "Error updating job",
        description: error instanceof Error ? error.message : "There was a problem updating the job.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

  const formatJobType = (type: string) => type?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "active": return <Badge className="bg-green-500">Active</Badge>;
      case "draft": return <Badge className="bg-gray-500">Draft</Badge>;
      case "closed": return <Badge className="bg-red-500">Closed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  if (!job) return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Job Not Found</CardTitle>
          <CardDescription>The job posting you're looking for doesn't exist or has been removed.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/employer/dashboard/jobs")}>View All Jobs</Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer">View Public Listing</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`/employer/dashboard/jobs/${job.id}/edit`}><Pencil className="mr-1 h-4 w-4" />Edit</a>
          </Button>
          {job.status === "draft" && (
            <Button variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleStatusChange("active")}> <CheckCircle className="mr-1 h-4 w-4" /> Publish </Button>
          )}
          {job.status === "active" && (
            <Button variant="outline" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50" onClick={() => handleStatusChange("closed")}> <XCircle className="mr-1 h-4 w-4" /> Close </Button>
          )}
          {job.status === "closed" && (
            <Button variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleStatusChange("active")}> <CheckCircle className="mr-1 h-4 w-4" /> Reopen </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="mr-1 h-4 w-4" /> {job.location}
                    {job.is_remote && <Badge variant="outline" className="ml-2">Remote Option</Badge>}
                  </CardDescription>
                </div>
                {getStatusBadge(job.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Briefcase className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{formatJobType(job.job_type)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>0 Applicants</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>Posted {formatDate(job.created_at)}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Job Description</h3>
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements?.length ? job.requirements.map((req, index) => <li key={index}>{req}</li>) : <li>No specific requirements listed</li>}
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-2">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.benefits?.length ? job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>) : <li>No specific benefits listed</li>}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><h3 className="text-sm font-medium text-muted-foreground">Company</h3><p>{job.company_name}</p></div>
              <div><h3 className="text-sm font-medium text-muted-foreground">Job Type</h3><p>{formatJobType(job.job_type)}</p></div>
              <div><h3 className="text-sm font-medium text-muted-foreground">Location</h3><p>{job.location}{job.is_remote && " (Remote option available)"}</p></div>
              <div><h3 className="text-sm font-medium text-muted-foreground">Salary Range</h3><p>${job.salary_min?.toLocaleString() || 0} - ${job.salary_max?.toLocaleString() || 0} per year</p></div>
              <div><h3 className="text-sm font-medium text-muted-foreground">Posted On</h3><p>{formatDate(job.created_at)}</p></div>
              {job.updated_at && job.updated_at !== job.created_at && (
                <div><h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3><p>{formatDate(job.updated_at)}</p></div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No applicants yet</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Applicants</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
