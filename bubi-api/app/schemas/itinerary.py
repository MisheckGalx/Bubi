from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class ItineraryCreate(BaseModel):
    title: str
    destination_slug: str
    budget_tier: str
    num_days: Optional[int] = None
    total_cost_usd: Optional[float] = None
    days: Optional[List[Any]] = []
    notes: Optional[str] = None


class ItineraryUpdate(BaseModel):
    title: Optional[str] = None
    notes: Optional[str] = None
    days: Optional[List[Any]] = None
    total_cost_usd: Optional[float] = None


class ItineraryOut(ItineraryCreate):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
