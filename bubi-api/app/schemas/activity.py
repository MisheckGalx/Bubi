from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ActivityBase(BaseModel):
    destination_id: int
    name: str
    category: Optional[str] = None
    difficulty: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    duration_hours: Optional[float] = None
    short_summary: Optional[str] = None
    image_url: Optional[str] = None
    booking_url: Optional[str] = None
    whatsapp_number: Optional[str] = None


class ActivityCreate(ActivityBase):
    pass


class ActivityUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    difficulty: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    duration_hours: Optional[float] = None
    short_summary: Optional[str] = None
    image_url: Optional[str] = None
    booking_url: Optional[str] = None


class ActivityOut(ActivityBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
