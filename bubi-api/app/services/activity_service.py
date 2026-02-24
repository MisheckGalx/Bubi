from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate, ActivityUpdate


def get_all(
    db: Session,
    destination_id: Optional[int] = None,
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    max_price: Optional[float] = None,
) -> List[Activity]:
    q = db.query(Activity)
    if destination_id:
        q = q.filter(Activity.destination_id == destination_id)
    if category:
        q = q.filter(Activity.category == category)
    if difficulty:
        q = q.filter(Activity.difficulty == difficulty)
    if max_price:
        q = q.filter(Activity.price_min <= max_price)
    return q.order_by(Activity.id).all()


def get_by_id(db: Session, activity_id: int) -> Optional[Activity]:
    return db.query(Activity).filter(Activity.id == activity_id).first()


def create(db: Session, data: ActivityCreate) -> Activity:
    act = Activity(**data.model_dump())
    db.add(act)
    db.commit()
    db.refresh(act)
    return act


def update(db: Session, act: Activity, data: ActivityUpdate) -> Activity:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(act, field, value)
    db.commit()
    db.refresh(act)
    return act


def delete(db: Session, act: Activity) -> None:
    db.delete(act)
    db.commit()
