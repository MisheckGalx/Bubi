from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.itinerary import ItineraryCreate, ItineraryUpdate, ItineraryOut
from app.services import itinerary_service
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/itineraries", tags=["Itineraries"])


@router.get("", response_model=List[ItineraryOut])
def list_itineraries(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return itinerary_service.get_user_itineraries(db, current_user.id)


@router.get("/{itinerary_id}", response_model=ItineraryOut)
def get_itinerary(
    itinerary_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    itin = itinerary_service.get_by_id(db, itinerary_id, current_user.id)
    if not itin:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itin


@router.post("", response_model=ItineraryOut, status_code=201)
def create_itinerary(
    data: ItineraryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return itinerary_service.create(db, data, current_user.id)


@router.patch("/{itinerary_id}", response_model=ItineraryOut)
def update_itinerary(
    itinerary_id: int,
    data: ItineraryUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    itin = itinerary_service.get_by_id(db, itinerary_id, current_user.id)
    if not itin:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itinerary_service.update(db, itin, data)


@router.delete("/{itinerary_id}", status_code=204)
def delete_itinerary(
    itinerary_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    itin = itinerary_service.get_by_id(db, itinerary_id, current_user.id)
    if not itin:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    itinerary_service.delete(db, itin)
