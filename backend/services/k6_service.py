import subprocess
import threading
import re
from config import CAPSTONE_PATH

latest_summary = {}
current_process = None
live_status = {
    "running": False,
    "runtime": 0,
    "current_vus": 0,
    "requests": 0,
    "progress": 0,
}


def start_test(script_path: str):

    global current_process

    print("Running:", script_path)

    live_status["running"] = True
    live_status["runtime"] = 0
    live_status["current_vus"] = 0
    live_status["requests"] = 0
    live_status["progress"] = 0

    print("Running:", script_path)

    process = subprocess.Popen(
        [
            "k6",
            "run",
            "--out",
            "experimental-prometheus-rw=http://localhost:9090/api/v1/write",
            script_path
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        cwd=CAPSTONE_PATH
    )

    threading.Thread(
        target=wait_and_parse,
        args=(process,),
        daemon=True
    ).start()

    current_process = process

    return process

def wait_and_parse(process):

    global latest_summary
    global current_process

    output_lines = []

    for line in process.stdout:
        output_lines.append(line)
        parse_live_line(line)
    
    stdout = "".join(
        output_lines
    )

    clean_output = remove_ansi(stdout)
    parsed = parse_summary(clean_output)
    
    latest_summary.clear()
    latest_summary.update(parsed)

    current_process = None
    live_status["running"] = False

def is_running():

    global current_process

    if current_process is None:
        return False

    return current_process.poll() is None

def remove_ansi(text: str):

    ansi_escape = re.compile(
        r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])'
    )

    return ansi_escape.sub('', text)

def parse_summary(output: str):

    result = {}

    checks_match = re.search(
        r"checks.*?(\d+\.\d+)%",
        output,
        re.DOTALL
    )

    if checks_match:
        result["success_rate"] = float(
            checks_match.group(1)
        )

    avg_match = re.search(
        r"http_req_duration.*?avg=([\d\.]+)(ms|µs)",
        output,
        re.DOTALL
    )

    if avg_match:
        result["avg_latency"] = (
            avg_match.group(1)
            + avg_match.group(2)
        )

    p95_match = re.search(
        r"http_req_duration.*?p\(95\)=([\d\.]+)(ms|µs)",
        output,
        re.DOTALL
    )

    if p95_match:
        result["p95_latency"] = (
            p95_match.group(1)
            + p95_match.group(2)
        )

    req_match = re.search(
        r"http_reqs.*?:\s*.*?(\d{3,})",
        output,
        re.DOTALL
    )

    if req_match:
        result["requests"] = int(
            req_match.group(1)
        )

    return result

def parse_live_line(line: str):

    runtime_match = re.search(
        r"running \(0m(\d+)\.\d+s\)",
        line
    )

    if runtime_match:

        live_status["runtime"] = int(
            runtime_match.group(1)
        )

    vus_match = re.search(
        r"(\d+)\/(\d+) VUs",
        line
    )

    if vus_match:

        live_status["current_vus"] = int(
            vus_match.group(1)
        )

    req_match = re.search(
        r"(\d+) complete",
        line
    )

    if req_match:

        live_status["requests"] = int(
            req_match.group(1)
        )

    progress_match = re.search(
        r"\[\s*(\d+)%\s*\]",
        line
    )

    if progress_match:

        live_status["progress"] = int(
            progress_match.group(1)
        )