from fastapi import APIRouter

router = APIRouter(
    prefix="/api/system",
    tags=["System"]
)

@router.get("/health")
async def health():
    return {
        "status": "healthy"
    }