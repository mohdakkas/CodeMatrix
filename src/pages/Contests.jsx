import { useEffect, useState } from "react";
import { fetchContests } from "../api/contestsService";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "Not scheduled";

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContests = async () => {
      try {
        setLoading(true);
        setError("");
        setContests(await fetchContests());
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load contests.");
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Contests</h1>
        <p className="mt-2 text-slate-400">Join live rounds or register for upcoming challenges.</p>
      </div>

      {loading && <div className="panel rounded-lg p-8 text-center text-slate-400">Loading contests...</div>}
      {!loading && error && <div className="panel rounded-lg border-rose-400/30 bg-rose-400/10 p-6 text-rose-200">{error}</div>}

      {!loading && !error && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contests.map((contest) => (
            <article key={contest.id} className="panel rounded-lg p-6 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <span className={`badge ${contest.status === "LIVE" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-amber-400/30 bg-amber-400/10 text-amber-300"}`}>
                {contest.status}
              </span>
              <h2 className="mt-5 text-xl font-bold text-white">{contest.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{contest.description}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <p>Starts: <span className="text-slate-200">{formatDate(contest.startTime)}</span></p>
                <p>Ends: <span className="text-slate-200">{formatDate(contest.endTime)}</span></p>
                <p>Problems: <span className="text-slate-200">{contest.problems?.length || 0}</span></p>
              </div>
              <button className={contest.status === "LIVE" ? "btn-primary mt-6 w-full" : "btn-secondary mt-6 w-full"}>
                {contest.status === "LIVE" ? "Enter Contest" : "View Details"}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contests;
