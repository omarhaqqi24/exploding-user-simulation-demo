# Exploding User Simulation Demo

# Exploding User Simulation Dashboard

A web-based control and monitoring dashboard developed for demonstrating the **Exploding User Simulation** capstone project.

> **This repository only contains the dashboard application.**
>
> The main project, which implements the scalable e-banking simulation and infrastructure, is available at:
>
> **https://github.com/adfdhli7/capstone-b4--kel5**

---

## Overview

This project provides a web dashboard that acts as a **control plane** for the main capstone system. It allows users to execute load testing scenarios, monitor test execution, control infrastructure services, and quickly access Grafana dashboards from a single interface.

Instead of interacting with the server manually through SSH, Docker CLI, and K6 commands, all operational tasks can be performed directly from the web dashboard.

---

## Features

### Dashboard

The dashboard provides an overview of the current testing environment, including:

* Running Docker containers
* Current load (Virtual Users)
* Latest load test result

---

### Load Testing

Execute K6 load tests directly from the browser.

Available scenarios:

* Baseline Test
* Peak Load Test

During execution, the dashboard displays:

* Runtime
* Current Virtual Users (VUs)
* Total processed requests
* Test progress

---

### Infrastructure Control

The dashboard can directly control infrastructure services from the main capstone project.

Supported services:

* Redis
* PostgreSQL

Available actions:

* Enable / Disable Redis
* Simulate PostgreSQL failure
* Recover PostgreSQL

These actions are executed using Docker Compose on the host machine.

---

### Performance Summary

After each K6 execution, the backend automatically parses the K6 summary output and displays:

* Success Rate
* Average Latency
* P95 Latency
* Total Requests

---

### Grafana Integration

The navigation bar provides quick access to:

* K6 Performance Dashboard
* Container Monitoring Dashboard

Both dashboards are opened in a new browser tab.

---

## Architecture

```text
                  React Dashboard
                         │
                         │ REST API
                         ▼
                 FastAPI Backend
                  (Control Plane)
                 ┌────────┴────────┐
                 │                 │
                 ▼                 ▼
          Docker Compose          K6
                 │                 │
                 ▼                 ▼
      Capstone Infrastructure   Load Test
```

The dashboard does **not** contain the banking application itself. Instead, it communicates with the main capstone project to execute tests and monitor infrastructure.

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router
* Lucide React

### Backend

* FastAPI
* Python
* Docker Compose
* K6
* Subprocess API

---

# Running the Project

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

# Backend Configuration

Create a `.env` file inside the backend directory.

Example:

```env
CAPSTONE_PATH=/path/to/capstone-b4--kel5

COMPOSE_PATH=/path/to/capstone-b4--kel5

BASELINE_SCRIPT=/path/to/load-test/baseline.js

PEAK_SCRIPT=/path/to/load-test/peak_load_test.js
```

These paths are used by the backend to:

* Execute Docker Compose commands
* Run K6 load test scripts
* Access the main capstone project

---

# Deployment

Before deploying the dashboard, update the following configuration according to your server environment.

## 1. Frontend API URL

The frontend currently communicates with the backend using Axios.

Update the backend URL inside:

```text
frontend/src/services/api.ts
```

Example:

```ts
export const api = axios.create({
    baseURL: "http://YOUR_SERVER_IP:8000",
});
```

If a reverse proxy such as Nginx is used, this can be changed to:

```ts
baseURL: "/api"
```

---

## 2. Vite Configuration (Optional)

When accessing the dashboard from another host during development, you may need to configure the Vite development server.

Update:

```text
frontend/vite.config.ts
```

Example:

```ts
export default defineConfig({
    server: {
        host: "0.0.0.0",
        allowedHosts: [
            "your-domain.com",
            "your-server-ip"
        ]
    }
})
```

This step is only required for Vite development mode and is not needed when serving the production build through Nginx.

---

## 3. Grafana URLs

The navigation bar redirects users to the Grafana dashboards.

Update the corresponding URLs to match your deployment environment before running the dashboard.

---

# Prerequisites

This dashboard assumes that the following software is already installed on the host machine:

* Docker
* Docker Compose
* K6

Additionally, the main capstone project should already be deployed and running.

---

# Related Repository

This repository only contains the dashboard application.

The complete scalable e-banking simulation—including the API Gateway, FastAPI services, Golang workers, Redis, PostgreSQL, Prometheus, Grafana, and K6 scripts—is maintained separately in:

**https://github.com/adfdhli7/capstone-b4--kel5**

This dashboard communicates with that project to provide a centralized interface for load testing, infrastructure control, monitoring, and demonstration.