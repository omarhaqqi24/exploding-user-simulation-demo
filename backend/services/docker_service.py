import subprocess

from config import CAPSTONE_PATH

def get_running_container_count():

    result = subprocess.run(
        [
            "docker",
            "ps",
            "-q"
        ],
        capture_output=True,
        text=True,
        cwd=CAPSTONE_PATH
    )

    containers = result.stdout.splitlines()

    return len(containers)

def get_service_status(service_name: str):

    result = subprocess.run(
        [
            "docker",
            "compose",
            "ps",
            service_name
        ],
        capture_output=True,
        text=True,
        cwd=CAPSTONE_PATH
    )

    return result.stdout

def toggle_service(service_name: str):

    status = get_service_status(
        service_name
    )

    if "Up" in status:

        subprocess.run(
            [
                "docker",
                "compose",
                "stop",
                service_name
            ],
            cwd=CAPSTONE_PATH
        )

        return "stopped"

    subprocess.run(
        [
            "docker",
            "compose",
            "start",
            service_name
        ],
        cwd=CAPSTONE_PATH
    )

    return "started"

def is_service_running(service_name: str):

    result = subprocess.run(
        [
            "docker",
            "compose",
            "ps",
            service_name
        ],
        capture_output=True,
        text=True,
        cwd=CAPSTONE_PATH
    )

    return "Up" in result.stdout