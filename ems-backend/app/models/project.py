import enum
from sqlalchemy import Column, Integer, String, Enum, Numeric
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class BillingType(enum.Enum):
    hourly = "hourly"
    count = "count"

class Project(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    billing_type = Column(Enum(BillingType), nullable=False)
    rate = Column(Numeric(10, 2), nullable=True)

    work_logs = relationship("WorkLog", back_populates="project")