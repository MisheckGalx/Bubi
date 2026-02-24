from fastapi import APIRouter
from app.api.v1.endpoints import destinations, activities, accommodations, auth, itineraries, alerts

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(destinations.router)
api_router.include_router(activities.router)
api_router.include_router(accommodations.router)
api_router.include_router(auth.router)
api_router.include_router(itineraries.router)
api_router.include_router(alerts.router)
