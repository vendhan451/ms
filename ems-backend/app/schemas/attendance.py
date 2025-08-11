from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class AttendanceBase(BaseModel):
    clock_in_time: Optional[datetime] = None
    clock_out_time: Optional[datetime] = None

# Properties to receive on creation
class AttendanceCreate(BaseModel):
    pass # No data needed, timestamps are generated

# Properties to receive on update
class AttendanceUpdate(BaseModel):
    pass # No data needed, timestamps are generated

# Properties shared by models stored in DB
class AttendanceInDBBase(AttendanceBase):
    id: int
    user_id: int
    clock_in_time: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Attendance(AttendanceInDBBase):
    pass

# Properties stored in DB
class AttendanceInDB(AttendanceInDBBase):
    pass