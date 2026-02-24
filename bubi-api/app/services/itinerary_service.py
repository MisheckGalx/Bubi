from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.itinerary import Itinerary
from app.schemas.itinerary import ItineraryCreate, ItineraryUpdate


def get_user_itineraries(db: Session, user_id: int) -> List[Itinerary]:
    return db.query(Itinerary).filter(Itinerary.user_id == user_id).order_by(Itinerary.created_at.desc()).all()


def get_by_id(db: Session, itinerary_id: int, user_id: int) -> Optional[Itinerary]:
    return db.query(Itinerary).filter(Itinerary.id == itinerary_id, Itinerary.user_id == user_id).first()


def create(db: Session, data: ItineraryCreate, user_id: int) -> Itinerary:
    itin = Itinerary(**data.model_dump(), user_id=user_id)
    db.add(itin)
    db.commit()
    db.refresh(itin)
    return itin


def update(db: Session, itin: Itinerary, data: ItineraryUpdate) -> Itinerary:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(itin, field, value)
    db.commit()
    db.refresh(itin)
    return itin


def delete(db: Session, itin: Itinerary) -> None:
    db.delete(itin)
    db.commit()
