from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class AccommodationBase(BaseModel):
    destination_id: int
    name: str
    accommodation_type: Optional[str] = None
    tier: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    star_rating: Optional[int] = None
    short_summary: Optional[str] = None
    image_url: Optional[str] = None
    booking_url: Optional[str] = None
    amenities: Optional[List[str]] = []


class AccommodationCreate(AccommodationBase):
    pass


class AccommodationUpdate(BaseModel):
    name: Optional[str] = None
    accommodation_type: Optional[str] = None
    tier: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    star_rating: Optional[int] = None
    short_summary: Optional[str] = None
    image_url: Optional[str] = None
    booking_url: Optional[str] = None
    amenities: Optional[List[str]] = None


class AccommodationOut(AccommodationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
