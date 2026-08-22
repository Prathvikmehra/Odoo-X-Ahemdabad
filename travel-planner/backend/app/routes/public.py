from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.trip import Trip
from app.schemas.public import PublicTripOut

router = APIRouter()


@router.get("/trips/{share_token}", response_model=PublicTripOut, status_code=status.HTTP_200_OK)
def get_shared_trip(share_token: str, db: Session = Depends(get_db)):
    trip = (
        db.query(Trip)
        .filter(Trip.share_token == share_token, Trip.is_public == True)  # noqa: E712
        .first()
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Public trip not found",
        )
    return trip
