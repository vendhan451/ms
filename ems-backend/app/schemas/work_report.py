from typing import Optional, List
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

# Shared properties for WorkLog
class WorkLogBase(BaseModel):
    project_id: int
    hours_worked: Optional[Decimal] = None
    items_counted: Optional[int] = None

# Properties to receive on creation
class WorkLogCreate(WorkLogBase):
    pass

# Properties to receive on update
class WorkLogUpdate(WorkLogBase):
    pass

# Properties shared by models stored in DB
class WorkLogInDBBase(WorkLogBase):
    id: int
    report_id: int

    class Config:
        from_attributes = True

# Properties to return to client
class WorkLog(WorkLogInDBBase):
    pass

# Shared properties for WorkReport
class WorkReportBase(BaseModel):
    report_date: date

# Properties to receive on creation
class WorkReportCreate(WorkReportBase):
    work_logs: List[WorkLogCreate]

# Properties to receive on update
class WorkReportUpdate(WorkReportBase):
    pass

# Properties shared by models stored in DB
class WorkReportInDBBase(WorkReportBase):
    id: int
    user_id: int
    work_logs: List[WorkLog] = []

    class Config:
        from_attributes = True

# Properties to return to client
class WorkReport(WorkReportInDBBase):
    pass