from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class Attendance(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    clock_in_time = Column(DateTime, nullable=False)
    clock_out_time = Column(DateTime, nullable=True)

    owner = relationship("User", back_populates="attendance_records")