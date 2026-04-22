export default function Loading() {
  return (
    <main className="pb-24 pt-28">
      <section className="mx-auto max-w-4xl px-6">
        <div className="mb-8 h-5 w-48 animate-pulse rounded-full bg-dental-blueDark/40" />
      </section>

      <section className="mx-auto max-w-4xl px-6">
        <div className="rounded-[32px] border border-dental-blueDark/50 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
          <div className="h-8 w-2/3 animate-pulse rounded-2xl bg-dental-blueDark/30" />
          <div className="mt-4 h-5 w-full animate-pulse rounded-xl bg-dental-blueDark/20" />
          <div className="mt-2 h-5 w-5/6 animate-pulse rounded-xl bg-dental-blueDark/20" />
          <div className="mt-10 h-64 animate-pulse rounded-[28px] bg-dental-blue/60" />
        </div>
      </section>
    </main>
  )
}
