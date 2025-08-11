from typing import List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.leave_request import LeaveRequest
from app.schemas.leave_request import LeaveRequestCreate, LeaveRequestUpdate


class CRUDLeaveRequest(
    CRUDBase[LeaveRequest, LeaveRequestCreate, LeaveRequestUpdate]
):
    def create_with_owner(
        self, db: Session, *, obj_in: LeaveRequestCreate, user_id: int
    ) -> LeaveRequest:
        db_obj = LeaveRequest(
            leave_type=obj_in.leave_type,
            start_date=obj_in.start_date,
            end_date=obj_in.end_date,
            reason=obj_in.reason,
            status=obj_in.status,
            user_id=user_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[LeaveRequest]:
        return (
            db.query(self.model)
            .filter(LeaveRequest.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


leave_request = CRUDLeaveRequest(LeaveRequest)