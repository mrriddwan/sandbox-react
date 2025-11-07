export default function TaskListSkeleton() {
  return (
    <div className="bg-neutral-100 py-10 md:p-10 flex flex-col gap-5">
      <div className="bg-white p-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex bg-white border-b-neutral-200 border-b px-3 py-5 justify-between animate-pulse"
          >
            <div className="flex gap-2 items-center flex-1">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded flex-1 max-w-[60%]"></div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

