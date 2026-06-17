type Props = {
  running: boolean;
  runtime: string;
  currentVus: number;
  requests: number;
  progress: number;
};

export default function LiveExecution({
  running,
  runtime,
  currentVus,
  requests,
  progress,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Live Test Execution
      </h2>

      <div className="grid gap-6 md:grid-cols-4">

        <div>
          <p className="text-sm text-slate-400">
            Status
          </p>

          <p
            className={`text-lg font-semibold ${
              running
                ? "text-green-400"
                : "text-slate-400"
            }`}
          >
            {running ? "RUNNING" : "IDLE"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Runtime
          </p>

          <p className="text-lg font-semibold">
            {runtime}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Current VUs
          </p>

          <p className="text-lg font-semibold">
            {currentVus}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Requests
          </p>

          <p className="text-lg font-semibold">
            {requests.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 rounded-full bg-slate-800">

          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}