from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.accommodation import Accommodation
from app.schemas.accommodation import AccommodationCreate, AccommodationUpdate


def get_all(
    db: Session,
    destination_id: Optional[int] = None,
    tier: Optional[str] = None,
    accommodation_type: Optional[str] = None,
) -> List[Accommodation]:
    q = db.query(Accommodation)
    if destination_id:
        q = q.filter(Accommodation.destination_id == destination_id)
    if tier:
        q = q.filter(Accommodation.tier == tier)
    if accommodation_type:
        q = q.filter(Accommodation.accommodation_type == accommodation_type)
    return q.order_by(Accommodation.id).all()


def get_by_id(db: Session, acc_id: int) -> Optional[Accommodation]:
    return db.query(Accommodation).filter(Accommodation.id == acc_id).first()


def create(db: Session, data: AccommodationCreate) -> Accommodation:
    acc = Accommodation(**data.model_dump())
    db.add(acc)
    db.commit()
    db.refresh(acc)
    return acc


def update(db: Session, acc: Accommodation, data: AccommodationUpdate) -> Accommodation:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(acc, field, value)
    db.commit()
    db.refresh(acc)
    return acc


def delete(db: Session, acc: Accommodation) -> None:
    db.delete(acc)
    db.commit()
