from typing import Optional
from pydantic import BaseModel
from app.models.project import BillingType
from decimal import Decimal

# Shared properties
class ProjectBase(BaseModel):
    name: Optional[str] = None
    billing_type: Optional[BillingType] = None
    rate: Optional[Decimal] = None

# Properties to receive on creation
class ProjectCreate(ProjectBase):
    name: str
    billing_type: BillingType

# Properties to receive on update
class ProjectUpdate(ProjectBase):
    pass

# Properties shared by models stored in DB
class ProjectInDBBase(ProjectBase):
    id: int
    name: str
    billing_type: BillingType

    class Config:
        from_attributes = True

# Properties to return to client
class Project(ProjectInDBBase):
    pass

# Properties stored in DB
class ProjectInDB(ProjectInDBBase):
    pass