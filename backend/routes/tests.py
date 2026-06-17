from fastapi import APIRouter, HTTPException
from services.k6_service import (
    start_test,
    is_running,
    latest_summary,
    live_status
)

from config import (
    BASELINE_SCRIPT,
    PEAK_SCRIPT
)

import threading
import time

router = APIRouter(
    prefix="/api/tests",
    tags=["Tests"]
)

test_state = {
    "running": False,
    "runtime": 0,
    "current_vus": 0,
    "requests": 0,
    "progress": 0,
    "scenario": None,
}

latest_result = {
    "success_rate": 0,
    "avg_latency": 0,
    "p95_latency": 0,
    "requests": 0
}

def simulate_test(scenario: str):

    test_state["running"] = True
    test_state["scenario"] = scenario

    duration = 30

    if scenario == "peak":
        duration = 46

    for second in range(duration):

        test_state["runtime"] = second + 1

        test_state["progress"] = int(
            ((second + 1) / duration) * 100
        )

        if scenario == "baseline":

            test_state["current_vus"] = 10
            test_state["requests"] += 250

        else:

            test_state["current_vus"] = min(
                500,
                (second + 1) * 15
            )

            test_state["requests"] += 3000

        time.sleep(1)
    
    if scenario == "baseline":

        latest_result["success_rate"] = 99.9
        latest_result["avg_latency"] = 25
        latest_result["p95_latency"] = 40
        latest_result["requests"] = test_state["requests"]

    else:

        latest_result["success_rate"] = 94.2
        latest_result["avg_latency"] = 280
        latest_result["p95_latency"] = 470
        latest_result["requests"] = test_state["requests"]

    test_state["running"] = False
    test_state["scenario"] = None

@router.get("/raw-result")
async def get_raw_result():
    return latest_summary

@router.post("/run")
async def run_test(payload: dict):

    if is_running():

        raise HTTPException(
            status_code=400,
            detail="Test already running"
        )

    scenario = payload["scenario"]

    if scenario == "baseline":

        start_test(
            BASELINE_SCRIPT
        )

    elif scenario == "peak":

        start_test(
            PEAK_SCRIPT
        )

    else:

        raise HTTPException(
            status_code=400,
            detail="Invalid scenario"
        )

    return {
        "message": "started"
    }

@router.get("/status")
async def get_status():
    return live_status

@router.get("/latest")
async def get_latest_result():
    return latest_summary