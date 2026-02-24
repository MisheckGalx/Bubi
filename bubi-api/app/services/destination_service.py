from sqlalchemy.orm import Session, joinedload
from typing import Optional, List
from app.models.destination import Destination
from app.schemas.destination import DestinationCreate, DestinationUpdate


def get_all(db: Session, featured_only: bool = False, tag: Optional[str] = None) -> List[Destination]:
    q = db.query(Destination)
    if featured_only:
        q = q.filter(Destination.is_featured == True)
    if tag:
        q = q.filter(Destination.tag.ilike(f"%{tag}%"))
    return q.order_by(Destination.id).all()


def get_by_slug(db: Session, slug: str) -> Optional[Destination]:
    return (
        db.query(Destination)
        .options(joinedload(Destination.activities), joinedload(Destination.accommodations))
        .filter(Destination.slug == slug)
        .first()
    )


def get_by_id(db: Session, dest_id: int) -> Optional[Destination]:
    return db.query(Destination).filter(Destination.id == dest_id).first()


def create(db: Session, data: DestinationCreate) -> Destination:
    dest = Destination(**data.model_dump())
    db.add(dest)
    db.commit()
    db.refresh(dest)
    return dest


def update(db: Session, dest: Destination, data: DestinationUpdate) -> Destination:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(dest, field, value)
    db.commit()
    db.refresh(dest)
    return dest


def delete(db: Session, dest: Destination) -> None:
    db.delete(dest)
    db.commit()
