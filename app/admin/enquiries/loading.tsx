export default function EnquiriesLoading() {
  return (
    <div className="max-w-xl mx-auto w-full space-y-5 animate-pulse">
      <div className="h-8 w-40 rounded-md bg-sol-beige-deep" />
      <ul className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <li key={i} className="rounded-2xl border border-sol-beige-deep bg-sol-paper p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="h-4 w-1/3 rounded bg-sol-beige" />
                <div className="h-3 w-24 rounded bg-sol-beige" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-1/2 rounded bg-sol-beige" />
                <div className="h-3 w-2/3 rounded bg-sol-beige" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded bg-sol-beige" />
                <div className="h-3 w-5/6 rounded bg-sol-beige" />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
