export default function TestLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Application Testing</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border border-teal-100 mb-8">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="mr-3 h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div>
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
