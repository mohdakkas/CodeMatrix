import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminDashboard from "../pages/AdminDashboard";
import CodeRoom from "../pages/CodeRoom";
import Contests from "../pages/Contests";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import ProblemDetails from "../pages/ProblemDetails";
import Problems from "../pages/Problems";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import SubmissionResultPage from "../pages/SubmissionResultPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
        <Route path="/code/:id" element={<CodeRoom />} />
        <Route path="/submission" element={<SubmissionResultPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/discuss" element={<Navigate to="/problems" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
