import os
import sys

# Add the parent directory to the sys.path so we can import 'app'
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from app.database.connection import SessionLocal, engine
from app.database.base import Base
from app.models.city import City
from app.models.seed_activity import SeedActivity
from app.seed.cities import CITIES
from app.seed.activities import ACTIVITIES
import app.models  # Ensures all models are loaded for create_all

def seed():
    # Make sure tables exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        print("Clearing existing seed data...")
        db.query(SeedActivity).delete()
        db.query(City).delete()
        db.commit()

        print("Seeding cities...")
        city_map = {}
        for city_data in CITIES:
            city = City(name=city_data["city"], country=city_data["country"])
            db.add(city)
            db.commit()
            db.refresh(city)
            city_map[city.name.lower()] = city.id
            
        print("Seeding activities...")
        for activity_data in ACTIVITIES:
            city_name = activity_data.get("city")
            city_id = city_map.get(city_name.lower())
            if not city_id:
                print(f"Warning: City {city_name} not found for activity {activity_data['name']}")
                continue
                
            activity = SeedActivity(
                city_id=city_id,
                name=activity_data["name"],
                type=activity_data["type"],
                description=activity_data.get("description"),
                cost=activity_data.get("cost", 0),
                duration_hours=activity_data.get("duration_hours"),
                start_time=activity_data.get("start_time"),
                image_url=activity_data.get("image_url")
            )
            db.add(activity)
        
        db.commit()
        print("Seeding complete!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed()
