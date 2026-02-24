from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.destination import DestinationOut, DestinationCreate, DestinationUpdate
from app.schemas.activity import ActivityOut
from app.schemas.accommodation import AccommodationOut
from app.services import destination_service
from app.models.destination import Destination

router = APIRouter(prefix="/destinations", tags=["Destinations"])


@router.get("", response_model=List[DestinationOut])
def list_destinations(
    featured: bool = Query(False),
    tag: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return destination_service.get_all(db, featured_only=featured, tag=tag)


@router.get("/{slug}")
def get_destination(slug: str, db: Session = Depends(get_db)):
    dest = destination_service.get_by_slug(db, slug)
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return {
        "id": dest.id,
        "name": dest.name,
        "slug": dest.slug,
        "province": dest.province,
        "short_summary": dest.short_summary,
        "description": dest.description,
        "hero_image_url": dest.hero_image_url,
        "image_urls": dest.image_urls,
        "latitude": dest.latitude,
        "longitude": dest.longitude,
        "best_months": dest.best_months,
        "safety_notes": dest.safety_notes,
        "travel_tips": dest.travel_tips,
        "unesco_heritage": dest.unesco_heritage,
        "is_featured": dest.is_featured,
        "tag": dest.tag,
        "prices": dest.prices,
        "created_at": dest.created_at,
        "updated_at": dest.updated_at,
        "activities": [
            {
                "id": a.id, "name": a.name, "category": a.category,
                "difficulty": a.difficulty, "price_min": a.price_min,
                "price_max": a.price_max, "duration_hours": a.duration_hours,
                "short_summary": a.short_summary, "image_url": a.image_url,
                "booking_url": a.booking_url, "whatsapp_number": a.whatsapp_number,
                "destination_id": a.destination_id,
                "created_at": a.created_at, "updated_at": a.updated_at,
            } for a in dest.activities
        ],
        "accommodations": [
            {
                "id": a.id, "name": a.name, "accommodation_type": a.accommodation_type,
                "tier": a.tier, "price_min": a.price_min, "price_max": a.price_max,
                "star_rating": a.star_rating, "short_summary": a.short_summary,
                "image_url": a.image_url, "booking_url": a.booking_url,
                "amenities": a.amenities, "destination_id": a.destination_id,
                "created_at": a.created_at, "updated_at": a.updated_at,
            } for a in dest.accommodations
        ],
    }


@router.post("", response_model=DestinationOut, status_code=201)
def create_destination(data: DestinationCreate, db: Session = Depends(get_db)):
    existing = destination_service.get_by_slug(db, data.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    return destination_service.create(db, data)


@router.patch("/{slug}", response_model=DestinationOut)
def update_destination(slug: str, data: DestinationUpdate, db: Session = Depends(get_db)):
    dest = destination_service.get_by_slug(db, slug)
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination_service.update(db, dest, data)


@router.delete("/{slug}", status_code=204)
def delete_destination(slug: str, db: Session = Depends(get_db)):
    dest = destination_service.get_by_slug(db, slug)
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    destination_service.delete(db, dest)
