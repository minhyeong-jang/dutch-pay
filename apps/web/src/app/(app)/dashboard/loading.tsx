export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
