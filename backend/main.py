from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.services import router as services_router
from routes.tests import router as tests_router
from routes.system import router as system_router

app = FastAPI(
    title="Exploding User Simulation Demo API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(system_router)
app.include_router(services_router)
app.include_router(tests_router)