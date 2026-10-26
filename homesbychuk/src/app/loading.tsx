export default function Loading() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 bg-[#E7E5E4] rounded-full" />
        <div className="h-6 w-96 bg-[#F4EDE2] rounded-full" />
        <div className="grid md:grid-cols-3 gap-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4 space-y-3">
              <div className="h-40 bg-[#E7E5E4] rounded-xl" />
              <div className="h-4 bg-[#E7E5E4] rounded-full" />
              <div className="h-4 w-2/3 bg-[#F4EDE2] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
