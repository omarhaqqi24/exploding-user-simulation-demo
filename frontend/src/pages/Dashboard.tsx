import MainLayout from "../layouts/MainLayout";
import SystemOverview from "../components/SystemOverview";
import ServiceCard from "../components/ServiceCard";
import CircuitBreakerCard from "../components/CircuitBreakerCard";
import TestScenarioCard from "../components/TestScenarioCard";
import LiveExecution from "../components/LiveExecution";
import LatestResults from "../components/LatestResults";
import QuickActionCard from "../components/QuickActionCard";
import { useState } from "react";
import {
  BarChart3,
  Download,
  Server,
} from "lucide-react";

import { Database, Layers3 } from "lucide-react";

export default function Dashboard() {
    const [selectedTest, setSelectedTest] = useState("baseline");

    const [running] = useState(true);
    const [runtime] = useState("00:31");
    const [currentVus] = useState(487);
    const [requests] = useState(91224);
    const [progress] = useState(72);

  return (
    
    <MainLayout>
        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold">
                Dashboard
                </h1>

                <p className="text-slate-400">
                Load Management & Resilience Testing Platform
                </p>
            </div>

            <div className="
                rounded-full
                border
                border-green-500/20
                bg-green-500/10
                px-4
                py-2
                text-sm
                text-green-400
                ">
                System Healthy
            </div>

        </div>

        <div className="space-y-6">
            <SystemOverview />

            {/* Infrastructure */}

            <section className="space-y-4">

                <div>
                    <h2 className="text-xl font-semibold">
                    Infrastructure
                    </h2>

                    <p className="text-sm text-slate-400">
                    Core platform services and resilience components
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <ServiceCard
                        title="Data Services"
                        subtitle="Redis Cache + Queue"
                        status="ACTIVE"
                        icon={<Layers3 className="text-green-500" />}
                        buttonText="Disable Redis"
                    />

                    <ServiceCard
                        title="Database"
                        subtitle="PostgreSQL Transaction Storage"
                        status="ACTIVE"
                        icon={<Database className="text-green-500" />}
                        buttonText="Simulate Failure"
                    />

                    <CircuitBreakerCard />

                </div>
                
            </section>

            {/* Operation */}

            <section className="space-y-4">
                
                <div>
                    <h2 className="text-xl font-semibold">
                    Operations
                    </h2>

                    <p className="text-sm text-slate-400">
                    Load testing and execution monitoring
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <h2 className="mb-6 text-xl font-semibold">Load Testing</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <TestScenarioCard
                            title="Baseline Test"
                            vus="10 Virtual Users"
                            duration="30 Seconds"
                            description="Stable Traffic"
                            selected={selectedTest === "baseline"}
                            onClick={() => setSelectedTest("baseline")}
                        />

                        <TestScenarioCard
                            title="Peak Load Test"
                            vus="500 VU Spike"
                            duration="46 Seconds"
                            description="Surge Simulation"
                            selected={selectedTest === "peak"}
                            onClick={() => setSelectedTest("peak")}
                        />
                    </div>

                    <button
                        className="
                            mt-6
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-3
                            font-medium
                            text-white
                            hover:bg-blue-500
                            "
                        >
                        Run Selected Test
                    </button>

                    <LiveExecution
                        running={running}
                        runtime={runtime}
                        currentVus={currentVus}
                        requests={requests}
                        progress={progress}
                    />
                </div>

            </section>

            {/* Result */}

            <section className="space-y-4">

                <div>
                    <h2 className="text-xl font-semibold">
                    Latest Result
                    </h2>

                    <p className="text-sm text-slate-400">
                    Performance summary from the latest execution
                    </p>
                </div>

                <LatestResults
                    successRate="99.4%"
                    avgLatency="42ms"
                    p95Latency="74ms"
                    requests="145K"
                />

            </section>

            <section className="space-y-4">

            <div>
                <h2 className="text-xl font-semibold">
                Quick Actions
                </h2>

                <p className="text-sm text-slate-400">
                Frequently used operations and shortcuts
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <QuickActionCard
                title="Open K6 Analytics"
                description="View load testing metrics in Grafana"
                icon={<BarChart3 size={24} />}
                onClick={() =>
                    window.open(
                        import.meta.env.VITE_K6_GRAFANA_URL,
                        "_blank"
                    )
                }
                />

                <QuickActionCard
                title="Infrastructure Monitoring"
                description="Container resource monitoring dashboard"
                icon={<Server size={24} />}
                onClick={() =>
                    window.open(
                        import.meta.env.VITE_INFRA_GRAFANA_URL,
                        "_blank"
                    )
                }
                />

                <QuickActionCard
                title="Export Result"
                description="Download latest load testing report"
                icon={<Download size={24} />}
                onClick={() => {
                    alert("Coming Soon");
                }}
                />

            </div>

            </section>

        </div>
    </MainLayout>
  );
}
