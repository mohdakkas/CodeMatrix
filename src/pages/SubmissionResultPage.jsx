import { Link } from "react-router-dom";
import SubmissionResult from "../components/SubmissionResult";

function SubmissionResultPage() {
  const demoResult = {
    verdict: "Accepted",
    runtime: "42 ms",
    memory: "41.7 MB",
    passed: "36 / 36",
    language: "Java",
  };

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-3xl">
        <SubmissionResult result={demoResult} />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/problems" className="btn-secondary">
            Back to Problems
          </Link>
          <Link to="/code/1" className="btn-primary">
            Open Code Editor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubmissionResultPage;
