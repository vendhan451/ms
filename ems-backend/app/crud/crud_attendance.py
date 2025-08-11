from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate, AttendanceUpdate


class CRUDAttendance(CRUDBase[Attendance, AttendanceCreate, AttendanceUpdate]):
    def create_with_owner(
        self, db: Session, *, user_id: int
    ) -> Attendance:
        db_obj = Attendance(user_id=user_id, clock_in_time=datetime.utcnow())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_latest_for_user(self, db: Session, *, user_id: int) -> Optional[Attendance]:
        return (
            db.query(Attendance)
            .filter(Attendance.user_id == user_id)
            .order_by(Attendance.clock_in_time.desc())
            .first()
        )

    def get_multi_by_owner(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Attendance]:
        return (
            db.query(self.model)
            .filter(Attendance.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


attendance = CRUDAttendance(Attendance)