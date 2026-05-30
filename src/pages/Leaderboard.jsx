import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api/leaderboardService";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");
        setUsers(await fetchLeaderboard());
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="mt-2 text-slate-400">Top CodeForge performers ranked by solved problems.</p>
      </div>

      {loading && <div className="panel rounded-lg p-8 text-center text-slate-400">Loading leaderboard...</div>}
      {!loading && error && <div className="panel rounded-lg border-rose-400/30 bg-rose-400/10 p-6 text-rose-200">{error}</div>}

      {!loading && !error && (
        <div className="panel overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-forge-soft text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-4">Rank</th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Solved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forge-line">
                {users.map((user) => (
                  <tr key={user.userId} className="hover:bg-forge-soft/70">
                    <td className="px-5 py-4 text-lg font-black text-amber-300">#{user.rank}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{user.fullName}</p>
                      <p className="text-slate-500">@{user.username}</p>
                    </td>
                    <td className="px-5 py-4 text-cyan-300">{user.solvedCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
