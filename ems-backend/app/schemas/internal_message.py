from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class InternalMessageBase(BaseModel):
    content: str
    attachment_url: Optional[str] = None

# Properties to receive on creation
class InternalMessageCreate(InternalMessageBase):
    recipient_id: Optional[int] = None # For direct messages

# Properties shared by models stored in DB
class InternalMessageInDBBase(InternalMessageBase):
    id: int
    sender_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class InternalMessage(InternalMessageInDBBase):
    pass