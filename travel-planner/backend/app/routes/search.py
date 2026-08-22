from fastapi import APIRouter, Query
from typing import List, Optional

from app.seed.cities import CITIES
from app.seed.activities import ACTIVITIES
from app.schemas.activity import ActivityCreate

router = APIRouter()

@router.get("/cities")
def get_cities():
    return CITIES

@router.get("/activities/search", response_model=List[ActivityCreate])
def search_activities(
    city: str = Query(..., description="City to filter activities by"),
    q: Optional[str] = Query(None, description="Optional search query for activity name")
):
    results = [a for a in ACTIVITIES if a["city"].lower() == city.lower()]
    if q:
        results = [a for a in results if q.lower() in a["name"].lower()]
        
    return results
