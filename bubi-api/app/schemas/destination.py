from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class DestinationBase(BaseModel):
    name: str
    slug: str
    province: str
    short_summary: str
    description: str
    hero_image_url: Optional[str] = None
    image_urls: Optional[List[str]] = []
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    best_months: Optional[List[str]] = []
    safety_notes: Optional[str] = None
    travel_tips: Optional[str] = None
    unesco_heritage: bool = False
    is_featured: bool = False
    tag: Optional[str] = None
    prices: Optional[Any] = {}


class DestinationCreate(DestinationBase):
    pass


class DestinationUpdate(BaseModel):
    name: Optional[str] = None
    short_summary: Optional[str] = None
    description: Optional[str] = None
    hero_image_url: Optional[str] = None
    image_urls: Optional[List[str]] = None
    best_months: Optional[List[str]] = None
    safety_notes: Optional[str] = None
    travel_tips: Optional[str] = None
    is_featured: Optional[bool] = None
    prices: Optional[Any] = None


class DestinationOut(DestinationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class DestinationDetail(DestinationOut):
    activities: List[Any] = []
    accommodations: List[Any] = []

    model_config = {"from_attributes": True}
