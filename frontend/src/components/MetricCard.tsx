type Props = {
  value: string;
  label: string;
};

export default function MetricCard({
  value,
  label,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <p className="mb-2 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="text-sm text-slate-400">
        {label}
      </p>

    </div>
  );
}