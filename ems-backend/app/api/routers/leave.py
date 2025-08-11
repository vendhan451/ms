from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.api.routers.users import check_is_admin

router = APIRouter()

@router.post("/", response_model=schemas.LeaveRequest)
def create_leave_request(
    *,
    db: Session = Depends(deps.get_db),
    request_in: schemas.LeaveRequestCreate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Create new leave request.
    """
    request = crud.leave_request.create_with_owner(
        db=db, obj_in=request_in, user_id=current_user.id
    )
    return request

@router.get("/my", response_model=List[schemas.LeaveRequest])
def read_my_leave_requests(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve current user's leave requests.
    """
    requests = crud.leave_request.get_multi_by_owner(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return requests

@router.get("/", response_model=List[schemas.LeaveRequest], dependencies=[Depends(check_is_admin)])
def read_leave_requests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve leave requests.
    """
    requests = crud.leave_request.get_multi(db, skip=skip, limit=limit)
    return requests

@router.put("/{request_id}/status", response_model=schemas.LeaveRequest, dependencies=[Depends(check_is_admin)])
def update_leave_request_status(
    *,
    db: Session = Depends(deps.get_db),
    request_id: int,
    status_in: schemas.LeaveRequestUpdate,
) -> Any:
    """
    Update a leave request's status.
    """
    request = crud.leave_request.get(db, id=request_id)
    if not request:
        raise HTTPException(
            status_code=404,
            detail="The leave request with this ID does not exist in the system",
        )
    request = crud.leave_request.update(db, db_obj=request, obj_in=status_in)
    return request