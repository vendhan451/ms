import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class Role(enum.Enum):
    admin = "admin"
    employee = "employee"

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(Role), default=Role.employee)
    profile_picture_url = Column(String, nullable=True)
    is_active = Column(Boolean(), default=True)

    reports = relationship("WorkReport", back_populates="owner")
    leave_requests = relationship("LeaveRequest", back_populates="owner")
    attendance_records = relationship("Attendance", back_populates="owner")
    billing_records = relationship("BillingRecord", back_populates="owner")
    sent_messages = relationship("InternalMessage", foreign_keys="[InternalMessage.sender_id]", back_populates="sender")
    received_messages = relationship("InternalMessage", foreign_keys="[InternalMessage.recipient_id]", back_populates="recipient")