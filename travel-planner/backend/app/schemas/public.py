from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional, List
from decimal import Decimal


class ShareTripOut(BaseModel):
    share_token: str
    share_url: str
    is_public: bool


class PublicActivityOut(BaseModel):
    id: int
    name: str
    type: str
    description: Optional[str] = None
    cost: Optional[Decimal] = None
    duration_hours: Optional[Decimal] = None
    start_time: Optional[str] = None
    image_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PublicStopOut(BaseModel):
    id: int
    city_name: str
    country: str
    start_date: date
    end_date: date
    stop_order: int
    activities: List[PublicActivityOut] = []

    model_config = ConfigDict(from_attributes=True)


class PublicTripOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    cover_image: Optional[str] = None
    is_public: bool
    share_token: Optional[str] = None
    stops: List[PublicStopOut] = []
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
