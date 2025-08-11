from app.crud.base import CRUDBase
from app.models.company_event import CompanyEvent
from app.schemas.company_event import CompanyEventCreate, CompanyEventUpdate


class CRUDCompanyEvent(
    CRUDBase[CompanyEvent, CompanyEventCreate, CompanyEventUpdate]
):
    pass


event = CRUDCompanyEvent(CompanyEvent)