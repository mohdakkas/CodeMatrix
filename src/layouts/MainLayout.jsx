import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_30%),#090d12] text-slate-100">
      <Navbar />
      <main className="min-h-[calc(100vh-132px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
