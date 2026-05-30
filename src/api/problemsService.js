import axiosInstance from "./axiosConfig";

const difficultyLabels = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const normalizeProblem = (problem) => ({
  ...problem,
  difficulty: difficultyLabels[problem.difficulty] || problem.difficulty || "Easy",
  tags: Array.isArray(problem.tags) ? problem.tags : [],
  status: problem.status || "Todo",
  acceptance: problem.acceptance || "N/A",
  description: problem.description || "No description available yet.",
  constraints: problem.constraints || "No constraints provided.",
  sampleInput: problem.sampleInput || "",
  sampleOutput: problem.sampleOutput || "",
  explanation: problem.explanation || "",
  starterCode: problem.starterCode || "",
});

export const fetchProblems = async () => {
  const response = await axiosInstance.get("/problems");
  return response.data.map(normalizeProblem);
};

export const fetchProblemsWithFilters = async ({ difficulty, tag } = {}) => {
  const params = {};
  if (difficulty && difficulty !== "All") params.difficulty = difficulty.toUpperCase();
  if (tag && tag !== "All") params.tag = tag;
  const response = await axiosInstance.get("/problems", { params });
  return response.data.map(normalizeProblem);
};

export const fetchProblemById = async (id) => {
  const response = await axiosInstance.get(`/problems/${id}`);
  return normalizeProblem(response.data);
};

export const fetchProblemBySlug = async (slug) => {
  const response = await axiosInstance.get(`/problems/slug/${slug}`);
  return normalizeProblem(response.data);
};

export const fetchProblem = async (idOrSlug) => {
  return /^\d+$/.test(String(idOrSlug)) ? fetchProblemById(idOrSlug) : fetchProblemBySlug(idOrSlug);
};
