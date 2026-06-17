import { ReactNode } from "react";
import Navbar from "../components/Navbar";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-12 pb-8">
        {children}
      </main>
    </div>
  );
}