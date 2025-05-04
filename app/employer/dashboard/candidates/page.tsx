"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Candidates</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Candidate Management
          </CardTitle>
          <CardDescription>View and manage candidates who have applied to your job postings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            No candidates have applied to your job postings yet. When candidates apply, they will appear here.
          </p>
          <Button variant="outline">Refresh Candidates</Button>
        </CardContent>
      </Card>
    </div>
  )
}
