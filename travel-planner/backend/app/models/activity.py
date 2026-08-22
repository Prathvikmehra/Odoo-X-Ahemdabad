from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True)
    stop_id = Column(Integer, ForeignKey("trip_stops.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    cost = Column(Numeric(10, 2), nullable=False, default=0)
    duration_hours = Column(Numeric(4, 2), nullable=True)
    start_time = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

    stop = relationship("TripStop", back_populates="activities")
