export default function FleetLoading() {
  return (
    <div className="max-w-xl mx-auto w-full space-y-5 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="h-8 w-24 rounded-md bg-sol-beige-deep" />
        <div className="h-10 w-32 rounded-4xl bg-sol-beige-deep" />
      </div>
      <ul className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <li key={i} className="rounded-2xl border border-sol-beige-deep bg-sol-paper p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-20 h-15 shrink-0 rounded-md bg-sol-beige" />
                <div className="min-w-0 flex-1 space-y-2 py-1">
                  <div className="h-4 w-2/3 rounded bg-sol-beige" />
                  <div className="h-3 w-1/3 rounded bg-sol-beige" />
                  <div className="h-3 w-1/4 rounded bg-sol-beige" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-4xl bg-sol-beige" />
                <div className="h-10 w-10 rounded-4xl bg-sol-beige" />
                <div className="h-10 flex-1 rounded-4xl bg-sol-beige" />
                <div className="h-10 flex-1 rounded-4xl bg-sol-beige" />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
