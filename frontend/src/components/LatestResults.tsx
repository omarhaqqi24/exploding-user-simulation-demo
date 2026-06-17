import MetricCard from "./MetricCard";

type Props = {
  successRate: string;
  avgLatency: string;
  p95Latency: string;
  requests: string;
};

export default function LatestResults({
  successRate,
  avgLatency,
  p95Latency,
  requests,
}: Props) {
  return (
    <div>

      <div className="grid gap-6 md:grid-cols-4">

        <MetricCard
          value={successRate}
          label="Success Rate"
        />

        <MetricCard
          value={avgLatency}
          label="Average Latency"
        />

        <MetricCard
          value={p95Latency}
          label="P95 Latency"
        />

        <MetricCard
          value={requests}
          label="Requests"
        />

      </div>

    </div>
  );
}