function StatsCard({ label, value, detail, accent = "text-cyan-300" }) {
  return (
    <div className="panel rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
      <p className="mt-2 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

export default StatsCard;
