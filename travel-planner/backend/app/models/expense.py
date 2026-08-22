from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.database.base import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Numeric(10, 2), nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)

    trip = relationship("Trip", back_populates="expenses")
