import axios from "axios";
import { contests } from "../data/contests";
import { leaderboard } from "../data/leaderboard";
import { problems } from "../data/problems";

export const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 250));

// Spring Boot integration point:
// Replace the dummy Promise responses below with api.get/post calls when REST endpoints are ready.
export const loginUser = (credentials) => wait({ token: "dummy-jwt-token", user: { name: "Demo User", ...credentials } });
export const registerUser = (payload) => wait({ success: true, user: payload });
export const getAllProblems = () => wait(problems);
export const getProblemById = (id) => wait(problems.find((problem) => problem.id === Number(id)));
export const submitCode = (payload) =>
  wait({
    ...payload,
    verdict: "Accepted",
    runtime: "42 ms",
    memory: "41.7 MB",
    passed: "36 / 36",
  });
export const getUserSubmissions = () =>
  wait([
    { id: 1, problem: "Two Sum", verdict: "Accepted", language: "Java", runtime: "42 ms", submittedAt: "2 hours ago" },
    { id: 2, problem: "Course Schedule", verdict: "Wrong Answer", language: "Python", runtime: "N/A", submittedAt: "Yesterday" },
    { id: 3, problem: "Valid Parentheses", verdict: "Accepted", language: "JavaScript", runtime: "58 ms", submittedAt: "3 days ago" },
  ]);
export const getLeaderboard = () => wait(leaderboard);
export const getContests = () => wait(contests);
export const addProblem = (problem) => wait({ success: true, problem });

export default api;
