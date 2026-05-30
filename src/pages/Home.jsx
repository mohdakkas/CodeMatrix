import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";

const features = [
  "Curated DSA problem sets with difficulty filters",
  "Split-screen coding room prepared for compiler API integration",
  "Contest, leaderboard, and profile screens for full demo flow",
  "Axios service layer ready for Spring Boot REST endpoints",
];

function Home() {
  return (
    <div className="page-shell">
      <section className="grid min-h-[520px] items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="badge border-cyan-300/30 bg-cyan-300/10 text-cyan-200">Interview-ready coding platform</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Practice, compete, and sharpen algorithms on CodeForge.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            A professional LeetCode-style frontend built for final-year projects, resume demos, and future Spring Boot integration.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/problems" className="btn-primary">
              Start Solving
            </Link>
            <Link to="/contests" className="btn-secondary">
              View Contests
            </Link>
          </div>
        </div>

        <div className="panel rounded-lg p-4">
          <div className="rounded-lg border border-forge-line bg-slate-950 p-4 font-mono text-sm">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <pre className="mt-5 overflow-x-auto text-slate-300">{`class Solution {
  public boolean canFinish(int n, int[][] edges) {
    // Build graph
    // Detect cycle
    return true;
  }
}`}</pre>
            <div className="mt-5 rounded-md border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
              Accepted · Runtime 42 ms · Memory 41.7 MB
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Problems" value="1,250+" detail="DSA, SQL, system logic" />
        <StatsCard label="Active Users" value="18K" detail="Practice community" accent="text-amber-300" />
        <StatsCard label="Contests" value="96" detail="Weekly and monthly rounds" />
        <StatsCard label="Acceptance" value="62%" detail="Track progress with clarity" accent="text-emerald-300" />
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold text-white">What CodeForge Includes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="panel rounded-lg p-5 transition hover:border-amber-300/40">
              <p className="text-slate-200">{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
