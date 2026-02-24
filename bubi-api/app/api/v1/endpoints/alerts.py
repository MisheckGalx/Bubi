from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.travel_alert import TravelAlertOut, TravelAlertCreate
from app.models.travel_alert import TravelAlert

router = APIRouter(prefix="/alerts", tags=["Travel Alerts"])


@router.get("", response_model=List[TravelAlertOut])
def list_alerts(
    destination_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(TravelAlert).filter(TravelAlert.is_active == True)
    if destination_id:
        q = q.filter(
            (TravelAlert.destination_id == destination_id) | (TravelAlert.destination_id == None)
        )
    return q.order_by(TravelAlert.id).all()


@router.post("", response_model=TravelAlertOut, status_code=201)
def create_alert(data: TravelAlertCreate, db: Session = Depends(get_db)):
    alert = TravelAlert(**data.model_dump())
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert
