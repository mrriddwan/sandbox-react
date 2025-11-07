export default function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 py-10 md:p-10">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white rounded-2xl shadow justify-start text-left gap-4 p-10 animate-pulse"
        >
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-16 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

