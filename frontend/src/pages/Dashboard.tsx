import MainLayout from "../layouts/MainLayout";
import SystemOverview from "../components/SystemOverview";
import ServiceCard from "../components/ServiceCard";
import TestScenarioCard from "../components/TestScenarioCard";
import LiveExecution from "../components/LiveExecution";
import LatestResults from "../components/LatestResults";
import { useLatestResult } from "../hooks/useLatestResult";

import { useServices } from "../hooks/useServices";
import { useState } from "react";
import { useTestStatus } from "../hooks/useTestStatus";
import { runTest } from "../services/testApi";

import {
  toggleRedis,
  togglePostgres,
} from "../services/serviceApi";


import { Database, Layers3 } from "lucide-react";

export default function Dashboard() {
    const [selectedTest, setSelectedTest] = useState("baseline");    
    const {
        services,
        refetchServices
    } = useServices();
    const redisStatus =
        services?.redis === "running"
            ? "ACTIVE"
            : "INACTIVE";

    const postgresStatus =
        services?.postgres === "running"
            ? "ACTIVE"
            : "INACTIVE";

    console.log(services);

    const testStatus = useTestStatus();
    const latestResult = useLatestResult();

    async function handleRedisToggle() {

        try {

            await toggleRedis();
            await refetchServices();

        } catch (error) {

            console.error(error);

        }
    }

    async function handlePostgresToggle() {

        try {

            await togglePostgres();
            await refetchServices();

        } catch (error) {

            console.error(error);

        }
    }

    async function handleRunTest() {

        try {

            await runTest(
            selectedTest
            );

        } catch (error) {

            console.error(error);

        }

    }

  return (
    
    <MainLayout>
        <div className="mb-6 flex items-center justify-between">

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
            <SystemOverview
                servicesRunning={
                    services?.services_running ?? 0
                }
                currentLoad={
                    testStatus?.running
                        ? `${testStatus.current_vus} VUs`
                        : "Idle"
                }
                lastTest={
                    latestResult?.requests
                        ? `${latestResult.requests.toLocaleString()} Req`
                        : "None"
                }
            />

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

                <div className="grid gap-6 md:grid-cols-2">
                    <ServiceCard
                        title="Data Services"
                        subtitle="Redis Cache + Queue"
                        status={redisStatus}
                        icon={<Layers3 className="text-green-500" />}
                        buttonText={
                            redisStatus === "ACTIVE"
                            ? "Disable Redis"
                            : "Enable Redis"
                        }
                        onAction={handleRedisToggle}
                    />

                    <ServiceCard
                        title="Database"
                        subtitle="PostgreSQL Transaction Storage"
                        status={postgresStatus}
                        icon={<Database className="text-green-500" />}
                        buttonText={
                            postgresStatus === "ACTIVE"
                            ? "Simulate Failure"
                            : "Recover Service"
                        }
                        onAction={handlePostgresToggle}
                    />

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
                        onClick={handleRunTest}
                        disabled={testStatus?.running}
                        className="
                            mt-6
                            mb-6
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-3
                            font-medium
                            text-white
                            hover:bg-blue-500
                            disabled:cursor-not-allowed
                            disabled:bg-slate-700
                        "
                        >
                        {
                            testStatus?.running
                            ? "Test Running..."
                            : "Run Selected Test"
                        }
                    </button>
                    <LiveExecution
                        running={
                            testStatus?.running ?? false
                        }
                        runtime={
                            String(
                            testStatus?.runtime ?? 0
                            )
                        }
                        currentVus={
                            testStatus?.current_vus ?? 0
                        }
                        requests={
                            testStatus?.requests ?? 0
                        }
                        progress={
                            testStatus?.progress ?? 0
                        }
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
                    successRate={
                        `${latestResult?.success_rate ?? 0}%`
                    }
                    avgLatency={
                        `${latestResult?.avg_latency ?? 0}`
                    }
                    p95Latency={
                        `${latestResult?.p95_latency ?? 0}`
                    }
                    requests={
                        String(
                        latestResult?.requests ?? 0
                        )
                    }
                />

            </section>
        </div>
    </MainLayout>
  );
}
