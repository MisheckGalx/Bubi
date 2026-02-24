from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.accommodation import AccommodationOut, AccommodationCreate, AccommodationUpdate
from app.services import accommodation_service

router = APIRouter(prefix="/accommodations", tags=["Accommodations"])


@router.get("", response_model=List[AccommodationOut])
def list_accommodations(
    destination_id: Optional[int] = Query(None),
    tier: Optional[str] = Query(None),
    accommodation_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return accommodation_service.get_all(db, destination_id, tier, accommodation_type)


@router.get("/{acc_id}", response_model=AccommodationOut)
def get_accommodation(acc_id: int, db: Session = Depends(get_db)):
    acc = accommodation_service.get_by_id(db, acc_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    return acc


@router.post("", response_model=AccommodationOut, status_code=201)
def create_accommodation(data: AccommodationCreate, db: Session = Depends(get_db)):
    return accommodation_service.create(db, data)


@router.patch("/{acc_id}", response_model=AccommodationOut)
def update_accommodation(acc_id: int, data: AccommodationUpdate, db: Session = Depends(get_db)):
    acc = accommodation_service.get_by_id(db, acc_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    return accommodation_service.update(db, acc, data)


@router.delete("/{acc_id}", status_code=204)
def delete_accommodation(acc_id: int, db: Session = Depends(get_db)):
    acc = accommodation_service.get_by_id(db, acc_id)
    if not acc:
        raise HTTPException(status_code=404, detail="Accommodation not found")
    accommodation_service.delete(db, acc)
