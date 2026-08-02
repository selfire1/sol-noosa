export default function EditCarLoading() {
  return (
    <div className="max-w-xl mx-auto w-full space-y-5 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-28 rounded bg-sol-beige-deep" />
        <div className="h-8 w-48 rounded bg-sol-beige-deep" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-16 rounded bg-sol-beige-deep" />
        <div className="aspect-[4/3] w-full max-w-60 rounded-md bg-sol-beige" />
        <div className="h-12 w-full max-w-60 rounded-4xl bg-sol-beige" />
      </div>
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 rounded bg-sol-beige-deep" />
              <div className="h-12 w-full rounded-md bg-sol-beige" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
