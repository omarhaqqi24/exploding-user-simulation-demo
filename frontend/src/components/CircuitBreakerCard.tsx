import { ShieldCheck } from "lucide-react";

export default function CircuitBreakerCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4 flex items-center gap-3">
        <ShieldCheck className="text-green-500" />

        <div>
          <h3 className="font-semibold">
            Circuit Breaker
          </h3>

          <p className="text-sm text-slate-400">
            Resilience Protection
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />

        <span className="font-medium text-green-400">
          CLOSED
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">
            Failure Count
          </span>

          <span>0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Last Change
          </span>

          <span>14:32</span>
        </div>
      </div>
    </div>
  );
}