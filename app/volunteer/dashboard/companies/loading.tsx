import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Skeleton className="h-10 w-[250px]" />

      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <Skeleton className="w-20 h-20 rounded-md" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-10 w-[100px]" />
                <Skeleton className="h-10 w-[150px]" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
