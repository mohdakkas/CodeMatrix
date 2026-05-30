import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Problems", path: "/problems" },
  { label: "Contests", path: "/contests" },
  { label: "Discuss", path: "/discuss" },
  { label: "Leaderboard", path: "/leaderboard" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-forge-soft text-cyan-200" : "text-slate-300 hover:bg-forge-soft hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-forge-line bg-forge-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-400 font-black text-slate-950">CF</span>
          <span className="text-lg font-bold tracking-wide text-white">CodeForge</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/profile" className="rounded-md border border-forge-line bg-forge-soft px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/50">
                {user.username || user.fullName}
              </Link>
              <button type="button" className="btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-md border border-forge-line px-3 py-2 text-sm text-slate-200 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </nav>

      {open && (
        <div className="border-t border-forge-line bg-forge-bg px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link to="/profile" className="btn-primary" onClick={() => setOpen(false)}>
                  {user.username || "Profile"}
                </Link>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link to="/login" className="btn-secondary" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
