import csv
from io import StringIO
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from starlette.responses import StreamingResponse
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.api.routers.users import check_is_admin

router = APIRouter()

@router.post("/", response_model=schemas.WorkReport)
def create_work_report(
    *,
    db: Session = Depends(deps.get_db),
    report_in: schemas.WorkReportCreate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Create new work report.
    """
    report = crud.work_report.create_with_owner(
        db=db, obj_in=report_in, user_id=current_user.id
    )
    return report

@router.get("/my", response_model=List[schemas.WorkReport])
def read_my_work_reports(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve current user's work reports.
    """
    reports = crud.work_report.get_multi_by_owner(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return reports

@router.get("/", response_model=List[schemas.WorkReport], dependencies=[Depends(check_is_admin)])
def read_work_reports(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve work reports.
    """
    reports = crud.work_report.get_multi(db, skip=skip, limit=limit)
    return reports

@router.get("/export", dependencies=[Depends(check_is_admin)])
def export_work_reports(
    db: Session = Depends(deps.get_db),
):
    """
    Export work reports to CSV.
    """
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["User", "Date", "Project", "Hours Worked", "Items Counted"])

    reports = db.query(models.WorkReport).all()
    for report in reports:
        for log in report.work_logs:
            writer.writerow(
                [
                    report.owner.full_name,
                    report.report_date,
                    log.project.name,
                    log.hours_worked,
                    log.items_counted,
                ]
            )
    
    output.seek(0)
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=work_reports.csv"},
    )