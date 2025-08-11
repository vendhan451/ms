from sqlalchemy import Column, Integer, Date, ForeignKey, Numeric
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class WorkReport(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    report_date = Column(Date, nullable=False)

    owner = relationship("User", back_populates="reports")
    work_logs = relationship("WorkLog", back_populates="report", cascade="all, delete-orphan")

class WorkLog(Base):
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("workreport.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("project.id"), nullable=False)
    hours_worked = Column(Numeric(5, 2))
    items_counted = Column(Integer)

    report = relationship("WorkReport", back_populates="work_logs")
    project = relationship("Project", back_populates="work_logs")