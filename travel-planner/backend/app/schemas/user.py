from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    name: str
    email: str


class UserOut(UserBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
