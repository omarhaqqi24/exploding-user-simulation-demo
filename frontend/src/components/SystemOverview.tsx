import { Activity } from "lucide-react";

export default function SystemOverview() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Activity className="text-green-500" />
        <h2 className="text-xl font-semibold">
          System Overview
        </h2>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="font-medium text-green-400">
          Healthy
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-sm text-slate-400">
            Services Running
          </p>

          <p className="text-xl font-bold">
            7 / 7
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Current Load
          </p>

          <p className="text-xl font-bold">
            Idle
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Last Test
          </p>

          <p className="text-xl font-bold">
            None
          </p>
        </div>
      </div>
    </div>
  );
}