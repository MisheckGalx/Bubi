from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Itinerary(Base, TimestampMixin):
    __tablename__ = "itineraries"

    id               = Column(Integer, primary_key=True, index=True)
    user_id          = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title            = Column(String(200), nullable=False)
    destination_slug = Column(String(100), nullable=False)
    budget_tier      = Column(String(20), nullable=False)  # budget, mid, luxury
    num_days         = Column(Integer)
    total_cost_usd   = Column(Float)
    days             = Column(JSON, default=list)   # array of day objects from mockData format
    notes            = Column(Text)

    user             = relationship("User", back_populates="itineraries")
