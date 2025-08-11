import enum
from sqlalchemy import Column, Integer, String, Enum, Date, ForeignKey, Numeric, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base

class BillingStatus(enum.Enum):
    DRAFT = "draft"
    FINALIZED = "finalized"

class BillingRecord(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    period_start_date = Column(Date, nullable=False)
    period_end_date = Column(Date, nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    status = Column(Enum(BillingStatus), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="billing_records")
    details = relationship("BillingDetail", back_populates="billing_record", cascade="all, delete-orphan")

class BillingDetail(Base):
    id = Column(Integer, primary_key=True, index=True)
    billing_record_id = Column(Integer, ForeignKey("billingrecord.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("project.id"), nullable=False)
    description = Column(String, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)

    billing_record = relationship("BillingRecord", back_populates="details")
    project = relationship("Project")