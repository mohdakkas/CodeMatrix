import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProblem } from "../api/problemsService";
import { submitCode } from "../api/submissionsService";
import { DIFFICULTY_STYLES } from "../utils/constants";

const defaultCode = `class Solution {
    public String solve() {
        // Write your solution here
        return "";
    }
}`;

function ProblemDetails() {
  const { id: idOrSlug } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("Java");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError("");
        const apiProblem = await fetchProblem(idOrSlug);
        setProblem(apiProblem);
        setCode(apiProblem.starterCode || defaultCode);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load this problem.");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [idOrSlug]);

  const handleRun = () => {
    const accepted = code.includes("return");
    setSubmitError("");
    setResult({
      status: accepted ? "ACCEPTED" : "WRONG_ANSWER",
      runtime: accepted ? 38 : 0,
      memory: accepted ? 40960 : 0,
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitError("");
      setResult(null);
      const submission = await submitCode({ problemId: problem.id, code, language });
      setResult(submission);
    } catch (apiError) {
      if (apiError.response?.status === 401) {
        setSubmitError("Please login before submitting code.");
      } else {
        setSubmitError(apiError.response?.data?.message || "Submission failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="page-shell text-slate-400">Loading problem from backend...</div>;
  }

  if (error) {
    return <div className="page-shell"><div className="panel rounded-lg border-rose-400/30 bg-rose-400/10 p-6 text-rose-200">{error}</div></div>;
  }

  if (!problem) {
    return <div className="page-shell text-slate-400">Problem not found.</div>;
  }

  return (
    <div className="page-shell">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="panel rounded-lg p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{problem.id}. {problem.title}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`badge ${DIFFICULTY_STYLES[problem.difficulty]}`}>{problem.difficulty}</span>
                {problem.tags.map((tag) => (
                  <span key={tag} className="badge border-forge-line bg-forge-soft text-slate-300">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/problems" className="btn-secondary">Back</Link>
              <Link to={`/code/${problem.slug || problem.id}`} className="btn-primary">Open Editor</Link>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Description</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-300">{problem.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Example</h2>
            <div className="mt-3 rounded-lg border border-forge-line bg-slate-950 p-4 font-mono text-sm text-slate-300">
              <p><span className="text-slate-500">Input:</span> {problem.sampleInput || "N/A"}</p>
              <p className="mt-2"><span className="text-slate-500">Output:</span> {problem.sampleOutput || "N/A"}</p>
              {problem.explanation && <p className="mt-2 whitespace-pre-line"><span className="text-slate-500">Explanation:</span> {problem.explanation}</p>}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Formats</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-forge-line bg-forge-soft p-4">
                <p className="text-sm font-semibold text-slate-200">Input Format</p>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-400">{problem.inputFormat || "N/A"}</p>
              </div>
              <div className="rounded-lg border border-forge-line bg-forge-soft p-4">
                <p className="text-sm font-semibold text-slate-200">Output Format</p>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-400">{problem.outputFormat || "N/A"}</p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Constraints</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-300">{problem.constraints}</p>
          </section>
        </article>

        <section className="panel rounded-lg">
          <div className="flex flex-col gap-3 border-b border-forge-line p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Code Editor</h2>
              <p className="mt-1 text-sm text-slate-400">Dummy judge accepts code that contains the word return.</p>
            </div>
            <select className="input-field sm:max-w-40" value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option>Java</option>
              <option>JavaScript</option>
              <option>Python</option>
              <option>C++</option>
            </select>
          </div>

          <textarea
            className="min-h-[460px] w-full resize-y bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none"
            value={code}
            spellCheck="false"
            onChange={(event) => setCode(event.target.value)}
          />

          <div className="border-t border-forge-line p-4">
            {submitError && <div className="mb-4 rounded-md border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{submitError}</div>}
            {result && (
              <div className={`mb-4 rounded-md border p-4 ${result.status === "ACCEPTED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}>
                <p className="text-lg font-bold">{result.status}</p>
                <p className="mt-1 text-sm">Runtime: {result.runtime ?? 0} ms | Memory: {result.memory ?? 0} KB</p>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" className="btn-secondary w-full sm:w-auto" onClick={handleRun} disabled={submitting}>Run</button>
              <button type="button" className="btn-primary w-full sm:w-auto" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Code"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProblemDetails;
