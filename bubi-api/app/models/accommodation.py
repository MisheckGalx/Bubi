from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Accommodation(Base, TimestampMixin):
    __tablename__ = "accommodations"

    id                   = Column(Integer, primary_key=True, index=True)
    destination_id       = Column(Integer, ForeignKey("destinations.id"), nullable=False, index=True)
    name                 = Column(String(150), nullable=False)
    accommodation_type   = Column(String(50))   # hotel, lodge, guesthouse, houseboat, camp
    tier                 = Column(String(30))    # budget, mid_range, luxury
    price_min            = Column(Float)
    price_max            = Column(Float)
    star_rating          = Column(Integer)
    short_summary        = Column(String(300))
    image_url            = Column(String(500))
    booking_url          = Column(String(500))
    amenities            = Column(JSON, default=list)

    destination          = relationship("Destination", back_populates="accommodations")
