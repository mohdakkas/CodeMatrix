import { useEffect, useMemo, useState } from "react";
import ProblemCard from "../components/ProblemCard";
import ProblemTable from "../components/ProblemTable";
import { fetchProblems } from "../api/problemsService";

const difficulties = ["All", "Easy", "Medium", "Hard"];
const statuses = ["All", "Solved", "Attempted", "Todo"];

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ difficulty: "All", status: "All", tag: "All" });

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        setError("");
        const apiProblems = await fetchProblems();
        setProblems(apiProblems);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load problems from the backend.");
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const tagOptions = useMemo(() => {
    const fetchedTags = problems.flatMap((problem) => problem.tags || []);
    return ["All", ...Array.from(new Set(fetchedTags)).sort()];
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const difficultyMatch = filters.difficulty === "All" || problem.difficulty === filters.difficulty;
      const statusMatch = filters.status === "All" || problem.status === filters.status;
      const tagMatch = filters.tag === "All" || problem.tags.includes(filters.tag);
      return difficultyMatch && statusMatch && tagMatch;
    });
  }, [filters, problems]);

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Problems</h1>
        <p className="mt-2 text-slate-400">Filter by difficulty, tags, and progress status.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="panel h-fit rounded-lg p-5">
          <h2 className="font-semibold text-white">Filters</h2>
          <FilterGroup label="Difficulty" options={difficulties} value={filters.difficulty} onChange={(value) => updateFilter("difficulty", value)} />
          <FilterGroup label="Tags" options={tagOptions} value={filters.tag} onChange={(value) => updateFilter("tag", value)} />
          <FilterGroup label="Status" options={statuses} value={filters.status} onChange={(value) => updateFilter("status", value)} />
        </aside>

        <section>
          {loading && (
            <div className="panel rounded-lg p-8 text-center text-slate-400">
              Loading problems from Spring Boot...
            </div>
          )}

          {!loading && error && (
            <div className="panel rounded-lg border-rose-400/30 bg-rose-400/10 p-6 text-rose-200">
              {error}
            </div>
          )}

          {!loading && !error && filteredProblems.length === 0 && (
            <div className="panel rounded-lg p-8 text-center text-slate-400">
              No problems match the selected filters.
            </div>
          )}

          {!loading && !error && filteredProblems.length > 0 && (
            <>
              <div className="hidden lg:block">
                <ProblemTable problems={filteredProblems} />
              </div>
              <div className="grid gap-4 lg:hidden">
                {filteredProblems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-slate-300">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`rounded-md border px-3 py-2 text-sm transition ${
              value === option ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200" : "border-forge-line bg-slate-950/40 text-slate-400 hover:text-white"
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Problems;
