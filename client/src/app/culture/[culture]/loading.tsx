export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Loading...
        </p>
      </div>
    </div>
  )
}
