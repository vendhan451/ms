from typing import List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.billing import BillingRecord
from app.schemas.billing import BillingRecordCreate, BillingRecordUpdate


class CRUDBillingRecord(
    CRUDBase[BillingRecord, BillingRecordCreate, BillingRecordUpdate]
):
    def get_multi_by_owner(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[BillingRecord]:
        return (
            db.query(self.model)
            .filter(BillingRecord.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


billing = CRUDBillingRecord(BillingRecord)