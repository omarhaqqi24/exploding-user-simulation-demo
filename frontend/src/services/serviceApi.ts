import { api } from "./api";

export async function toggleRedis() {
    return api.post(
        "/api/services/redis/toggle"
    );
}

export async function togglePostgres() {
    return api.post(
        "/api/services/postgres/toggle"
    );
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

export async function getTestStatus() {
    return api.get(
        "/api/tests/status"
    );
}