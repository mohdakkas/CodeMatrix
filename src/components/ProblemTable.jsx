import { Link } from "react-router-dom";
import { DIFFICULTY_STYLES, STATUS_STYLES } from "../utils/constants";

function ProblemTable({ problems }) {
  return (
    <div className="panel overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-forge-soft text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4">Difficulty</th>
              <th className="px-4 py-4">Acceptance</th>
              <th className="px-4 py-4">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forge-line">
            {problems.map((problem) => (
              <tr key={problem.id} className="transition hover:bg-forge-soft/70">
                <td className="px-4 py-4">
                  <span className={`badge ${STATUS_STYLES[problem.status]}`}>{problem.status}</span>
                </td>
                <td className="px-4 py-4">
                  <Link to={`/problems/${problem.slug || problem.id}`} className="font-semibold text-slate-100 hover:text-cyan-200">
                    {problem.id}. {problem.title}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <span className={`badge ${DIFFICULTY_STYLES[problem.difficulty]}`}>{problem.difficulty}</span>
                </td>
                <td className="px-4 py-4 text-slate-300">{problem.acceptance}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="badge border-forge-line bg-slate-950/50 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemTable;
