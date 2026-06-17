from fastapi import APIRouter
from services.docker_service import (
    toggle_service,
    is_service_running,
    get_running_container_count
)
from services.k6_service import (
    live_status,
    latest_summary
)

router = APIRouter(
    prefix="/api/services",
    tags=["Services"]
)

service_state = {
    "redis": "running",
    "postgres": "running",
    "api_service": "running",
    "worker_service": "running"
}

@router.get("/")
async def get_services():

    return {
        "redis":
            "running"
            if is_service_running("redis")
            else "stopped",

        "postgres":
            "running"
            if is_service_running("postgres")
            else "stopped",

        "services_running":
            get_running_container_count()
    }

@router.get("/overview")
async def get_overview():

    return {
        "services_running":
            get_running_container_count(),

        "current_load":
            live_status["current_vus"],

        "last_test":
            latest_summary.get(
                "requests",
                0
            )
    }

@router.post("/redis/toggle")
async def toggle_redis():

    result = toggle_service(
        "redis"
    )

    return {
        "status": result
    }

@router.post("/postgres/toggle")
async def toggle_postgres():

    result = toggle_service(
        "postgres"
    )

    return {
        "status": result
    }