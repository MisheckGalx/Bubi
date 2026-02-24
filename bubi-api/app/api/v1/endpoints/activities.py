from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.activity import ActivityOut, ActivityCreate, ActivityUpdate
from app.services import activity_service

router = APIRouter(prefix="/activities", tags=["Activities"])


@router.get("", response_model=List[ActivityOut])
def list_activities(
    destination_id: Optional[int] = Query(None),
    category: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    max_price: Optional[float] = Query(None),
    db: Session = Depends(get_db),
):
    return activity_service.get_all(db, destination_id, category, difficulty, max_price)


@router.get("/{activity_id}", response_model=ActivityOut)
def get_activity(activity_id: int, db: Session = Depends(get_db)):
    act = activity_service.get_by_id(db, activity_id)
    if not act:
        raise HTTPException(status_code=404, detail="Activity not found")
    return act


@router.post("", response_model=ActivityOut, status_code=201)
def create_activity(data: ActivityCreate, db: Session = Depends(get_db)):
    return activity_service.create(db, data)


@router.patch("/{activity_id}", response_model=ActivityOut)
def update_activity(activity_id: int, data: ActivityUpdate, db: Session = Depends(get_db)):
    act = activity_service.get_by_id(db, activity_id)
    if not act:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity_service.update(db, act, data)


@router.delete("/{activity_id}", status_code=204)
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    act = activity_service.get_by_id(db, activity_id)
    if not act:
        raise HTTPException(status_code=404, detail="Activity not found")
    activity_service.delete(db, act)
