import time

from services.k6_service import (
    start_test,
    latest_summary
)

from config import BASELINE_SCRIPT

process = start_test(
    BASELINE_SCRIPT
)

process.wait()

time.sleep(1)

print(latest_summary)