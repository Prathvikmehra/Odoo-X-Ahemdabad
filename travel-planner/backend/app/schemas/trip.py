from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional


class TripBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    cover_image: Optional[str] = None


class TripCreate(TripBase):
    pass


class TripUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    cover_image: Optional[str] = None
    is_public: Optional[bool] = None


class TripOut(TripBase):
    id: int
    user_id: int
    is_public: bool
    share_token: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
