from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.work_report import WorkReport, WorkLog
from app.schemas.work_report import WorkReportCreate, WorkReportUpdate


class CRUDWorkReport(CRUDBase[WorkReport, WorkReportCreate, WorkReportUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: WorkReportCreate, user_id: int
    ) -> WorkReport:
        db_obj = WorkReport(
            report_date=obj_in.report_date,
            user_id=user_id,
            work_logs=[WorkLog(**log.dict()) for log in obj_in.work_logs],
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[WorkReport]:
        return (
            db.query(self.model)
            .filter(WorkReport.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


work_report = CRUDWorkReport(WorkReport)