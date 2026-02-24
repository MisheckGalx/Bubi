from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class TravelAlert(Base, TimestampMixin):
    __tablename__ = "travel_alerts"

    id             = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=True, index=True)
    title          = Column(String(200), nullable=False)
    body           = Column(Text, nullable=False)
    severity       = Column(String(20), nullable=False)  # info, warning, danger
    icon           = Column(String(10))
    is_active      = Column(Boolean, default=True)

    destination    = relationship("Destination", back_populates="travel_alerts")
