import { Link } from "react-router-dom";
import { DIFFICULTY_STYLES, STATUS_STYLES } from "../utils/constants";

function ProblemCard({ problem }) {
  return (
    <Link to={`/problems/${problem.slug || problem.id}`} className="panel block rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">{problem.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{problem.description}</p>
        </div>
        <span className={`badge ${DIFFICULTY_STYLES[problem.difficulty]}`}>{problem.difficulty}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span key={tag} className="badge border-forge-line bg-forge-soft text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-400">Acceptance {problem.acceptance}</span>
        <span className={`badge ${STATUS_STYLES[problem.status]}`}>{problem.status}</span>
      </div>
    </Link>
  );
}

export default ProblemCard;
