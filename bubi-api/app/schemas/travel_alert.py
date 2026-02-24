from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TravelAlertCreate(BaseModel):
    destination_id: Optional[int] = None
    title: str
    body: str
    severity: str  # info, warning, danger
    icon: Optional[str] = None
    is_active: bool = True


class TravelAlertOut(TravelAlertCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
