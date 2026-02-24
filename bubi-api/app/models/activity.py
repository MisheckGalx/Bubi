from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Activity(Base, TimestampMixin):
    __tablename__ = "activities"

    id               = Column(Integer, primary_key=True, index=True)
    destination_id   = Column(Integer, ForeignKey("destinations.id"), nullable=False, index=True)
    name             = Column(String(150), nullable=False)
    category         = Column(String(50))   # adventure, wildlife, cultural, water, leisure, scenic, extreme
    difficulty       = Column(String(50))   # easy, moderate, challenging, extreme
    price_min        = Column(Float)
    price_max        = Column(Float)
    duration_hours   = Column(Float)
    short_summary    = Column(String(300))
    image_url        = Column(String(500))
    booking_url      = Column(String(500))
    whatsapp_number  = Column(String(30))

    destination      = relationship("Destination", back_populates="activities")
