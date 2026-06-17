from dotenv import load_dotenv
import os

load_dotenv()

CAPSTONE_PATH = os.getenv("CAPSTONE_PATH")

BASELINE_SCRIPT = os.getenv(
    "BASELINE_SCRIPT"
)

PEAK_SCRIPT = os.getenv(
    "PEAK_SCRIPT"
)