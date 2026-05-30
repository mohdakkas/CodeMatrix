function SubmissionResult({ result }) {
  const verdict = result?.verdict || result?.status || "WRONG_ANSWER";
  const accepted = verdict === "Accepted" || verdict === "ACCEPTED";

  return (
    <div className="panel rounded-lg p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Submission Result</p>
          <h2 className={`mt-2 text-3xl font-bold ${accepted ? "text-emerald-300" : "text-rose-300"}`}>
            {verdict}
          </h2>
        </div>
        <span className={`badge ${accepted ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-rose-400/30 bg-rose-400/10 text-rose-300"}`}>
          {result?.passed || "21 / 36"} test cases
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-forge-soft p-4">
          <p className="text-sm text-slate-400">Runtime</p>
          <p className="mt-2 text-xl font-bold text-white">{result?.runtime || "N/A"}</p>
        </div>
        <div className="rounded-lg bg-forge-soft p-4">
          <p className="text-sm text-slate-400">Memory</p>
          <p className="mt-2 text-xl font-bold text-white">{result?.memory || "N/A"}</p>
        </div>
        <div className="rounded-lg bg-forge-soft p-4">
          <p className="text-sm text-slate-400">Language</p>
          <p className="mt-2 text-xl font-bold text-white">{result?.language || "Java"}</p>
        </div>
      </div>
    </div>
  );
}

export default SubmissionResult;
