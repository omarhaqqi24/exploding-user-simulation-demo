import { NavLink } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Server,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <h1 className="text-lg font-bold text-white">
          CIMB Load Management Platform
        </h1>

        <div className="flex gap-3">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <Activity size={16} />
            Dashboard
          </NavLink>

          <button
            onClick={() =>
              window.open(
                import.meta.env.VITE_K6_GRAFANA_URL,
                "_blank"
              )
            }
            className="
              flex items-center gap-2 rounded-lg px-4 py-2
              text-sm transition
              bg-slate-900 text-slate-300
              hover:bg-slate-800
            "
          >
            <BarChart3 size={16} />
            K6 Analytics
          </button>

          <button
            onClick={() =>
              window.open(
                import.meta.env.VITE_INFRA_GRAFANA_URL,
                "_blank"
              )
            }
            className="
              flex items-center gap-2 rounded-lg px-4 py-2
              text-sm transition
              bg-slate-900 text-slate-300
              hover:bg-slate-800
            "
          >
            <Server size={16} />
            Infrastructure Monitoring
          </button>

        </div>
      </div>
    </nav>
  );
}