import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidates Section */}
        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[200px]" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-[100px]" />
            </div>
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg border">
              <div className="flex justify-between">
                <div>
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[180px] mt-1" />
                </div>
              </div>
              <div className="mt-2 flex gap-1">
                <Skeleton className="h-5 w-[80px] rounded-full" />
                <Skeleton className="h-5 w-[100px] rounded-full" />
                <Skeleton className="h-5 w-[90px] rounded-full" />
              </div>
              <Skeleton className="h-4 w-[200px] mt-2" />
              <Skeleton className="h-4 w-[150px] mt-1" />
              <div className="mt-2">
                <Skeleton className="h-5 w-[100px] rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Section */}
        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-[180px]" />
            </div>
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg border">
              <div className="flex justify-between">
                <div>
                  <Skeleton className="h-5 w-[180px]" />
                  <Skeleton className="h-4 w-[150px] mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-[250px] mt-1" />
              <Skeleton className="h-4 w-full mt-2" />
              <div className="mt-2">
                <Skeleton className="h-4 w-[100px]" />
                <div className="pl-5 mt-1 space-y-1">
                  <Skeleton className="h-3 w-[200px]" />
                  <Skeleton className="h-3 w-[180px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-[250px]" />
      </div>
    </div>
  )
}
