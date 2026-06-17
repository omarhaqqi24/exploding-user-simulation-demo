type Props = {
  title: string;
  vus: string;
  duration: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

export default function TestScenarioCard({
  title,
  vus,
  duration,
  description,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-2xl
        border
        p-6
        text-left
        transition-all
        ${
          selected
            ? "border-blue-500 bg-slate-900"
            : "border-slate-800 bg-slate-950 hover:border-slate-700"
        }
      `}
    >
      <h3 className="mb-4 text-lg font-semibold">
        {title}
      </h3>

      <div className="space-y-2">
        <p className="text-slate-300">{vus}</p>
        <p className="text-slate-300">{duration}</p>
        <p className="text-sm text-slate-400">
          {description}
        </p>
      </div>
    </button>
  );
}