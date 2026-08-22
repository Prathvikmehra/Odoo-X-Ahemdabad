from fastapi import APIRouter, Query, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import date

from app.seed.cities import CITIES
from app.seed.activities import ACTIVITIES
from app.schemas.activity import ActivityCreate
from app.database.connection import get_db
from app.models.user import User
from app.models.trip import Trip
from app.models.trip_stop import TripStop
from app.models.activity import Activity
from app.models.expense import Expense
from app.core.security import get_password_hash

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

@router.post("/seed")
def seed_database(db: Session = Depends(get_db)):
    # 1. Create default user if not exists
    email = "alex.mercer@globetrotter.io"
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            name="Alex Mercer",
            email=email,
            password_hash=get_password_hash("password123")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # 2. Check if user already has trips
    existing_trips = db.query(Trip).filter(Trip.user_id == user.id).first()
    if not existing_trips:
        # Create a premium Europe trip
        europe_trip = Trip(
            user_id=user.id,
            name="European Summer Escape",
            description="From the romantic lights of Paris and the quiet canals of Amsterdam to Berlin's concrete stories and Prague's medieval bridges.",
            start_date=date(2026, 6, 15),
            end_date=date(2026, 6, 25),
            cover_image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
            is_public=True,
            share_token="europe-summer-2026"
        )
        db.add(europe_trip)
        db.commit()
        db.refresh(europe_trip)

        # Create stops for this trip
        stops = [
            TripStop(trip_id=europe_trip.id, city_name="Paris", country="France", start_date=date(2026, 6, 15), end_date=date(2026, 6, 18), stop_order=1),
            TripStop(trip_id=europe_trip.id, city_name="Amsterdam", country="Netherlands", start_date=date(2026, 6, 18), end_date=date(2026, 6, 21), stop_order=2),
            TripStop(trip_id=europe_trip.id, city_name="Berlin", country="Germany", start_date=date(2026, 6, 21), end_date=date(2026, 6, 23), stop_order=3),
            TripStop(trip_id=europe_trip.id, city_name="Prague", country="Czech Republic", start_date=date(2026, 6, 23), end_date=date(2026, 6, 25), stop_order=4)
        ]
        for s in stops:
            db.add(s)
        db.commit()

        # Refresh stops to get IDs
        paris_stop = db.query(TripStop).filter(TripStop.trip_id == europe_trip.id, TripStop.city_name == "Paris").first()
        ams_stop = db.query(TripStop).filter(TripStop.trip_id == europe_trip.id, TripStop.city_name == "Amsterdam").first()
        berlin_stop = db.query(TripStop).filter(TripStop.trip_id == europe_trip.id, TripStop.city_name == "Berlin").first()

        # Add activities to stops
        activities = [
            Activity(stop_id=paris_stop.id, name="Eiffel Tower Sunrise Climb", type="Sightseeing", description="Beat the crowds and see Paris wake up from the 2nd floor balcony.", cost=3000, duration_hours=2, start_time="08:30 AM", image_url="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80"),
            Activity(stop_id=paris_stop.id, name="Louvre Masterpieces Walking Tour", type="Museum", description="Guided walk of essential wings including Winged Victory and Venus de Milo.", cost=2500, duration_hours=3, start_time="11:30 AM", image_url="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80"),
            Activity(stop_id=paris_stop.id, name="Sunset River Seine Cruise", type="Sightseeing", description="Bateau ride as the historical facades light up amber against the dusk.", cost=2000, duration_hours=1, start_time="07:30 PM", image_url="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80"),
            
            Activity(stop_id=ams_stop.id, name="Herengracht Canal Evening Cruise", type="Sightseeing", description="Intimate wooden boat sailing past historic bridges and illuminated merchant houses.", cost=1800, duration_hours=1.5, start_time="08:00 PM", image_url="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80"),
            
            Activity(stop_id=berlin_stop.id, name="Museum Island Historical Walk", type="Museum", description="Strolling past the Pergamon Museum, Neues Museum, and Berlin Cathedral dome.", cost=0, duration_hours=2.5, start_time="10:00 AM", image_url="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80")
        ]
        for act in activities:
            db.add(act)
        db.commit()

        # Add expenses
        expenses = [
            Expense(trip_id=europe_trip.id, amount=45000, category="Accommodation", description="Historical Paris Airbnb & Amsterdam boutique hostel"),
            Expense(trip_id=europe_trip.id, amount=18000, category="Transport", description="Eurail passes & city metro tickets"),
            Expense(trip_id=europe_trip.id, amount=7500, category="Activities", description="Seine Cruise, Louvre & Eiffel Tower tickets"),
            Expense(trip_id=europe_trip.id, amount=12000, category="Meals", description="Local creperies and Dutch stroopwafels")
        ]
        for exp in expenses:
            db.add(exp)
        db.commit()

    return {"status": "success", "message": "Database seeded successfully", "user": email, "password": "password123"}

