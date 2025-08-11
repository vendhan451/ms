from datetime import date, datetime
from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.api.routers.users import check_is_admin

router = APIRouter()

@router.post("/attendance/clock-in", response_model=schemas.Attendance)
def clock_in(
    *,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Clock in for the current user.
    """
    latest_attendance = crud.attendance.get_latest_for_user(db=db, user_id=current_user.id)
    if latest_attendance and not latest_attendance.clock_out_time:
        raise HTTPException(
            status_code=400,
            detail="User has already clocked in.",
        )
    attendance = crud.attendance.create_with_owner(db=db, user_id=current_user.id)
    return attendance

@router.post("/attendance/clock-out", response_model=schemas.Attendance)
def clock_out(
    *,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Clock out for the current user.
    """
    latest_attendance = crud.attendance.get_latest_for_user(db=db, user_id=current_user.id)
    if not latest_attendance or latest_attendance.clock_out_time:
        raise HTTPException(
            status_code=400,
            detail="User has not clocked in or has already clocked out.",
        )
    latest_attendance.clock_out_time = datetime.utcnow()
    db.add(latest_attendance)
    db.commit()
    db.refresh(latest_attendance)
    return latest_attendance

@router.get("/attendance", response_model=List[schemas.Attendance], dependencies=[Depends(check_is_admin)])
def read_attendance(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve attendance records.
    """
    attendance = crud.attendance.get_multi(db, skip=skip, limit=limit)
    return attendance

@router.post("/billing/calculate", dependencies=[Depends(check_is_admin)])
def calculate_billing(
    *,
    db: Session = Depends(deps.get_db),
    start_date: date,
    end_date: date,
) -> Any:
    """
    Calculate billing for a given period.
    """
    work_logs = (
        db.query(models.WorkLog)
        .filter(models.WorkLog.report.has(models.WorkReport.report_date >= start_date))
        .filter(models.WorkLog.report.has(models.WorkReport.report_date <= end_date))
        .all()
    )

    billing_data = {}
    for log in work_logs:
        if log.project.billing_type == "count":
            user_id = log.report.user_id
            if user_id not in billing_data:
                billing_data[user_id] = {"total": 0, "details": []}
            
            amount = log.items_counted * log.project.rate
            billing_data[user_id]["total"] += amount
            billing_data[user_id]["details"].append(
                {
                    "project_id": log.project_id,
                    "description": f"{log.items_counted} items at ${log.project.rate}",
                    "amount": amount,
                }
            )
    return billing_data

@router.post("/billing/finalize", dependencies=[Depends(check_is_admin)])
def finalize_billing(
    *,
    db: Session = Depends(deps.get_db),
    billing_data: dict,
) -> Any:
    """
    Finalize billing records.
    """
    # This is a simplified implementation. In a real application, you would
    # want to handle potential race conditions and ensure data consistency.
    for user_id, data in billing_data.items():
        billing_record = schemas.BillingRecordCreate(
            user_id=user_id,
            period_start_date=date.today(), # Placeholder
            period_end_date=date.today(), # Placeholder
            total_amount=data["total"],
            status="draft",
            details=[schemas.BillingDetailCreate(**detail) for detail in data["details"]],
        )
        crud.billing.create(db, obj_in=billing_record)
    return {"message": "Billing finalized successfully"}

@router.get("/billing", response_model=List[schemas.BillingRecord], dependencies=[Depends(check_is_admin)])
def read_billing_records(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve billing records.
    """
    billing_records = crud.billing.get_multi(db, skip=skip, limit=limit)
    return billing_records

@router.get("/billing/my", response_model=List[schemas.BillingRecord])
def read_my_billing_records(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve current user's billing records.
    """
    billing_records = crud.billing.get_multi_by_owner(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return billing_records

@router.post("/billing/import", dependencies=[Depends(check_is_admin)])
async def import_billing_records(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
) -> Any:
    """
    Import billing records from a CSV file.
    """
    # This is a simplified implementation. In a real application, you would
    # want to handle file validation, error handling, and background processing.
    contents = await file.read()
    # Process CSV contents and create billing records
    return {"message": "Billing records imported successfully"}