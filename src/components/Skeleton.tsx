export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted/60 rounded-2xl relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </div>
  )
}
