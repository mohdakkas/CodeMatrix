import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authService";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authResponse = await register({
        fullName: event.currentTarget.fullName.value,
        username: event.currentTarget.username.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      });
      saveSession(authResponse);
      navigate("/profile");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex min-h-[680px] items-center justify-center">
      <form onSubmit={handleSubmit} className="panel w-full max-w-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-slate-400">Join CodeForge and start tracking your progress.</p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm text-slate-300">
            Full Name
            <input name="fullName" className="input-field mt-2" placeholder="Your name" required />
          </label>
          <label className="block text-sm text-slate-300">
            Username
            <input name="username" className="input-field mt-2" placeholder="codeforge_user" minLength="3" required />
          </label>
          <label className="block text-sm text-slate-300">
            Email
            <input name="email" type="email" className="input-field mt-2" placeholder="you@example.com" required />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input name="password" type="password" className="input-field mt-2" placeholder="Create password" minLength="6" required />
          </label>
        </div>
        {error && <div className="mt-5 rounded-md border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</div>}
        <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
        <p className="mt-5 text-center text-sm text-slate-400">
          Already registered? <Link to="/login" className="text-cyan-300 hover:text-cyan-200">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
