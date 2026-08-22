from sqlalchemy import Column, Integer, String
from app.database.base import Base

class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True, nullable=False)
    country = Column(String, nullable=False)
