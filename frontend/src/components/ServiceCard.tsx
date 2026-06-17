import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  status: "ACTIVE" | "INACTIVE";
  icon: ReactNode;
  buttonText?: string;
  onAction?: () => void;
};

export default function ServiceCard({
  title,
  subtitle,
  status,
  icon,
  buttonText,
  onAction
}: Props) {
  const isActive = status === "ACTIVE";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4 flex items-center gap-3">
        {icon}

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            isActive ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span
          className={`font-medium ${
            isActive ? "text-green-400" : "text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      {buttonText && (
        <button onClick={onAction} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
          {buttonText}
        </button>
      )}
    </div>
  );
}