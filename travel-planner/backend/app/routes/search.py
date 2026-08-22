from fastapi import APIRouter, Query, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict

from app.database.connection import get_db
from app.models.city import City
from app.models.seed_activity import SeedActivity
from app.schemas.activity import ActivityCreate

router = APIRouter()


class CityOut(BaseModel):
    id: int
    name: str
    country: str
    model_config = ConfigDict(from_attributes=True)


class SearchActivityResponse(ActivityCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


@router.get("/cities", response_model=List[CityOut])
def get_cities(db: Session = Depends(get_db)):
    return db.query(City).all()


@router.get("/activities/search", response_model=List[SearchActivityResponse])
def search_activities(
    city: str = Query(..., description="City to filter activities by"),
    q: Optional[str] = Query(None, description="Optional search query for activity name"),
    db: Session = Depends(get_db)
):
    query = db.query(SeedActivity).join(City).filter(City.name.ilike(city))

    if q:
        query = query.filter(SeedActivity.name.ilike(f"%{q}%"))

    return query.all()
