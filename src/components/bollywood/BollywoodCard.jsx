export default function BollywoodCard({ title, tag, image, summary }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
      {image ? (
        <div className="h-40 w-full bg-center bg-cover" style={{ backgroundImage: `url(${image})` }} />
      ) : null}
      <div className="p-4">
        <div className="text-xs uppercase tracking-wider text-white/60">{tag}</div>
        <div className="mt-1 text-base font-medium">{title}</div>
        {summary ? (
          <div className="mt-2 text-sm text-white/60">{summary}</div>
        ) : (
          <div className="mt-2 text-sm text-white/60">Read more → (fake content)</div>
        )}
      </div>
    </div>
  );
}