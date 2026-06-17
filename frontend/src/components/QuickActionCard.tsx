import { ReactNode } from "react";

type Props = {
    title: string;
    description: string;
    icon: ReactNode;
    onClick: () => void;
};

export default function QuickActionCard({
    title,
    description,
    icon,
    onClick,
}: Props) {
    return (
        <button
        onClick={onClick}
        className="
            w-full
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-5
            text-left
            transition-all
            hover:border-blue-500
            hover:bg-slate-800
        "
        >
        <div className="mb-3 text-blue-400">{icon}</div>

        <h3 className="font-semibold text-white">{title}</h3>

        <p className="mt-1 text-sm text-slate-400">{description}</p>
        </button>
    );
}
