import { api } from "./api";

export async function getTestStatus() {
    return api.get("/api/tests/status");
}

export async function runTest(
    scenario: string
) {
    return api.post(
        "/api/tests/run",
        {
        scenario,
        }
    );
}