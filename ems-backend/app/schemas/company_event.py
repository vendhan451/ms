from typing import Optional
from pydantic import BaseModel
from datetime import date
from app.models.company_event import EventType

# Shared properties
class CompanyEventBase(BaseModel):
    title: Optional[str] = None
    event_type: Optional[EventType] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

# Properties to receive on creation
class CompanyEventCreate(CompanyEventBase):
    title: str
    event_type: EventType
    start_date: date
    end_date: date

# Properties to receive on update
class CompanyEventUpdate(CompanyEventBase):
    pass

# Properties shared by models stored in DB
class CompanyEventInDBBase(CompanyEventBase):
    id: int

    class Config:
        from_attributes = True

# Properties to return to client
class CompanyEvent(CompanyEventInDBBase):
    pass