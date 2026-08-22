from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class SeedActivity(Base):
    __tablename__ = "seed_activities"

    id = Column(Integer, primary_key=True)
    city_id = Column(Integer, ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    cost = Column(Numeric(10, 2), nullable=False, default=0)
    duration_hours = Column(Numeric(4, 2), nullable=True)
    start_time = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

    city = relationship("City")
