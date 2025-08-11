from typing import Optional
from pydantic import BaseModel
from datetime import date
from app.models.leave_request import LeaveType, LeaveStatus

# Shared properties
class LeaveRequestBase(BaseModel):
    leave_type: Optional[LeaveType] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    reason: Optional[str] = None
    status: Optional[LeaveStatus] = None

# Properties to receive on creation
class LeaveRequestCreate(LeaveRequestBase):
    leave_type: LeaveType
    start_date: date
    end_date: date
    reason: str

# Properties to receive on update
class LeaveRequestUpdate(BaseModel):
    status: LeaveStatus

# Properties shared by models stored in DB
class LeaveRequestInDBBase(LeaveRequestBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# Properties to return to client
class LeaveRequest(LeaveRequestInDBBase):
    pass

# Properties stored in DB
class LeaveRequestInDB(LeaveRequestInDBBase):
    pass