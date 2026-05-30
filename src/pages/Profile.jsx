import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCurrentUser, fetchMySubmissions } from "../api/userService";
import StatsCard from "../components/StatsCard";

function Profile() {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const [currentUser, mySubmissions] = await Promise.all([
          fetchCurrentUser(),
          fetchMySubmissions(),
        ]);
        setUser(currentUser);
        setSubmissions(mySubmissions);
      } catch (apiError) {
        if (apiError.response?.status === 401) {
          setError("Please login to view your profile.");
        } else {
          setError(apiError.response?.data?.message || "Unable to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="page-shell text-slate-400">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="page-shell">
        <div className="panel rounded-lg border-rose-400/30 bg-rose-400/10 p-6 text-rose-200">
          <p>{error}</p>
          <Link to="/login" className="btn-primary mt-5">Login</Link>
        </div>
      </div>
    );
  }

  const initials = user.fullName?.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "CF";

  return (
    <div className="page-shell">
      <section className="panel rounded-lg p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-amber-400 text-2xl font-black text-slate-950">{initials}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
              <p className="text-slate-400">@{user.username} | {user.role}</p>
            </div>
          </div>
          <div className="rounded-lg border border-forge-line bg-forge-soft px-4 py-3 text-sm text-slate-300">
            Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "recently"}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Solved" value={user.solvedCount ?? 0} detail="Accepted submissions" accent="text-emerald-300" />
        <StatsCard label="Submissions" value={submissions.length} detail="Total attempts" />
        <StatsCard label="Email" value={user.email} detail="Account email" accent="text-amber-300" />
      </section>

      <section className="mt-6 panel rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white">Recent Submissions</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">Problem</th>
                <th>Status</th>
                <th>Language</th>
                <th>Runtime</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forge-line">
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="py-4 font-medium text-slate-200">{submission.problemTitle}</td>
                  <td className={submission.status === "ACCEPTED" ? "text-emerald-300" : "text-rose-300"}>{submission.status}</td>
                  <td className="text-slate-400">{submission.language}</td>
                  <td className="text-slate-400">{submission.runtime ?? 0} ms</td>
                  <td className="text-slate-400">{submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "N/A"}</td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td className="py-6 text-slate-400" colSpan="5">No submissions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Profile;
