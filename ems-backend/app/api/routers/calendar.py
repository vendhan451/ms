from datetime import date
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.api.routers.users import check_is_admin

router = APIRouter()

@router.post("/events", response_model=schemas.CompanyEvent, dependencies=[Depends(check_is_admin)])
def create_company_event(
    *,
    db: Session = Depends(deps.get_db),
    event_in: schemas.CompanyEventCreate,
) -> Any:
    """
    Create new company event.
    """
    event = crud.event.create(db, obj_in=event_in)
    return event

@router.get("/view", response_model=List[Any])
def read_calendar_view(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    month: int = date.today().month,
    year: int = date.today().year,
) -> Any:
    """
    Retrieve a unified calendar view for a given month.
    """
    # This is a simplified implementation. In a real application, you would
    # want to handle date filtering more robustly.
    public_events = db.query(models.CompanyEvent).all()
    leave_requests = crud.leave_request.get_multi_by_owner(db, user_id=current_user.id)
    work_reports = crud.work_report.get_multi_by_owner(db, user_id=current_user.id)

    calendar_items = []
    for event in public_events:
        calendar_items.append(
            {
                "type": "event",
                "title": event.title,
                "start_date": event.start_date,
                "end_date": event.end_date,
            }
        )
    for request in leave_requests:
        calendar_items.append(
            {
                "type": "leave",
                "status": request.status,
                "start_date": request.start_date,
                "end_date": request.end_date,
            }
        )
    for report in work_reports:
        calendar_items.append(
            {
                "type": "report",
                "date": report.report_date,
            }
        )
    return calendar_items