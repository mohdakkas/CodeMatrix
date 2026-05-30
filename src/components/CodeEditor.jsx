import { LANGUAGES, STARTER_CODE } from "../utils/constants";

function CodeEditor({ language, setLanguage, code, setCode, onRun, onSubmit }) {
  return (
    <div className="panel flex h-full min-h-[620px] flex-col rounded-lg">
      <div className="flex flex-col gap-3 border-b border-forge-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <select className="input-field sm:max-w-48" value={language} onChange={(event) => {
          const nextLanguage = event.target.value;
          setLanguage(nextLanguage);
          setCode(STARTER_CODE[nextLanguage]);
        }}>
          {LANGUAGES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <div className="flex gap-3">
          <button type="button" className="btn-secondary" onClick={onRun}>
            Run
          </button>
          <button type="button" className="btn-primary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
      <textarea
        className="min-h-[520px] flex-1 resize-none bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none"
        spellCheck="false"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <div className="border-t border-forge-line bg-forge-soft px-4 py-3 text-xs text-slate-400">
        Dummy editor UI now. Monaco or CodeMirror can be added later without changing page structure.
      </div>
    </div>
  );
}

export default CodeEditor;
