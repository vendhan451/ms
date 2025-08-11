from typing import Optional, List
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal
from app.models.billing import BillingStatus

# Shared properties for BillingDetail
class BillingDetailBase(BaseModel):
    project_id: int
    description: str
    amount: Decimal

# Properties to receive on creation
class BillingDetailCreate(BillingDetailBase):
    pass

# Properties shared by models stored in DB
class BillingDetailInDBBase(BillingDetailBase):
    id: int
    billing_record_id: int

    class Config:
        from_attributes = True

# Properties to return to client
class BillingDetail(BillingDetailInDBBase):
    pass

# Shared properties for BillingRecord
class BillingRecordBase(BaseModel):
    period_start_date: date
    period_end_date: date
    total_amount: Decimal
    status: BillingStatus

# Properties to receive on creation
class BillingRecordCreate(BillingRecordBase):
    user_id: int
    details: List[BillingDetailCreate]

# Properties to receive on update
class BillingRecordUpdate(BaseModel):
    status: BillingStatus

# Properties shared by models stored in DB
class BillingRecordInDBBase(BillingRecordBase):
    id: int
    user_id: int
    created_at: datetime
    details: List[BillingDetail] = []

    class Config:
        from_attributes = True

# Properties to return to client
class BillingRecord(BillingRecordInDBBase):
    pass