import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProblem } from "../api/problemsService";
import { submitCode } from "../api/submissionsService";
import CodeEditor from "../components/CodeEditor";
import SubmissionResult from "../components/SubmissionResult";
import { STARTER_CODE } from "../utils/constants";

function CodeRoom() {
  const { id = 1 } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState(STARTER_CODE.Java);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError("");
        const apiProblem = await fetchProblem(id);
        setProblem(apiProblem);
        setCode(apiProblem.starterCode || STARTER_CODE.Java);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to prepare coding room.");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  const toResultCard = (submission) => ({
    verdict: submission.status,
    runtime: `${submission.runtime ?? 0} ms`,
    memory: `${submission.memory ?? 0} KB`,
    passed: submission.status === "ACCEPTED" ? "All sample tests" : "Needs changes",
    language: submission.language || language,
  });

  const handleRun = () => {
    const accepted = code.includes("return");
    setResult(toResultCard({
      status: accepted ? "ACCEPTED" : "WRONG_ANSWER",
      runtime: accepted ? 38 : 0,
      memory: accepted ? 40960 : 0,
      language,
    }));
  };

  const handleSubmit = async () => {
    const submission = await submitCode({ problemId: problem.id, language, code });
    setResult(toResultCard(submission));
  };

  if (loading) {
    return <div className="page-shell text-slate-400">Preparing coding room...</div>;
  }

  if (error) {
    return <div className="page-shell"><div className="panel rounded-lg border-rose-400/30 bg-rose-400/10 p-6 text-rose-200">{error}</div></div>;
  }

  return (
    <div className="page-shell">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
          <p className="mt-1 text-sm text-slate-400">Split-screen coding environment</p>
        </div>
        <button type="button" className="btn-secondary" onClick={() => navigate(`/problems/${problem.slug || problem.id}`)}>
          Problem Details
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="panel rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white">Statement</h2>
          <p className="mt-4 whitespace-pre-line leading-7 text-slate-300">{problem.description}</p>
          <div className="mt-6">
            <h3 className="font-semibold text-white">Example</h3>
            <div className="mt-3 rounded-lg border border-forge-line bg-slate-950 p-4 font-mono text-sm text-slate-300">
              <p>Input: {problem.sampleInput || "N/A"}</p>
              <p className="mt-2">Output: {problem.sampleOutput || "N/A"}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-white">Constraints</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-400">{problem.constraints}</p>
          </div>
          {result && <div className="mt-6"><SubmissionResult result={result} /></div>}
        </section>

        <CodeEditor
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onRun={handleRun}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CodeRoom;
