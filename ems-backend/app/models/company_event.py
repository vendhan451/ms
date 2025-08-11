import enum
from sqlalchemy import Column, Integer, String, Enum, Date

from app.db.base_class import Base

class EventType(enum.Enum):
    HOLIDAY = "holiday"
    EVENT = "event"

class CompanyEvent(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    event_type = Column(Enum(EventType), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)