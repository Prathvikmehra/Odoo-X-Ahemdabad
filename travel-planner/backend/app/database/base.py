from sqlalchemy.orm import declarative_base

Base = declarative_base()

from app.models.user import User
from app.models.trip import Trip
# TODO: Import TripStop, Activity, Expense models here when they are added
