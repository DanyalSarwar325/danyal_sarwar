

export function PostShimmer() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-card p-6 animate-pulse"
        >
          {/* Title */}
          <div className="h-6 w-3/4 rounded-md bg-muted mb-4" />

          {/* Body lines */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-5/6 rounded-md bg-muted" />
            <div className="h-4 w-4/6 rounded-md bg-muted" />
          </div>

          {/* Footer */}
          <div className="mt-4 flex gap-4">
            <div className="h-4 w-24 rounded-md bg-muted" />
            <div className="h-4 w-16 rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
