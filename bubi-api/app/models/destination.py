from sqlalchemy import Column, Integer, String, Text, Boolean, Float, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Destination(Base, TimestampMixin):
    __tablename__ = "destinations"

    id               = Column(Integer, primary_key=True, index=True)
    name             = Column(String(100), nullable=False)
    slug             = Column(String(100), unique=True, nullable=False, index=True)
    province         = Column(String(100), nullable=False)
    short_summary    = Column(String(300), nullable=False)
    description      = Column(Text, nullable=False)
    hero_image_url   = Column(String(500))
    image_urls       = Column(JSON, default=list)
    latitude         = Column(Float)
    longitude        = Column(Float)
    best_months      = Column(JSON, default=list)
    safety_notes     = Column(Text)
    travel_tips      = Column(Text)
    unesco_heritage  = Column(Boolean, default=False)
    is_featured      = Column(Boolean, default=False)
    tag              = Column(String(80))
    prices           = Column(JSON, default=dict)  # {budget:{hotel,meals,activities}, mid:{...}, luxury:{...}}

    # Relationships
    activities       = relationship("Activity", back_populates="destination", cascade="all, delete-orphan")
    accommodations   = relationship("Accommodation", back_populates="destination", cascade="all, delete-orphan")
    travel_alerts    = relationship("TravelAlert", back_populates="destination")
