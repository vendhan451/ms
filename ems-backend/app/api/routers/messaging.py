from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.api.routers.users import check_is_admin

router = APIRouter()

@router.post("/", response_model=schemas.InternalMessage)
def send_message(
    *,
    db: Session = Depends(deps.get_db),
    message_in: schemas.InternalMessageCreate,
    current_user: models.User = Depends(deps.get_current_user),
    file: UploadFile = File(None),
) -> Any:
    """
    Send a new message.
    """
    if not message_in.recipient_id:
        check_is_admin(current_user)
    
    attachment_url = None
    if file:
        # In a real application, you would upload the file to a cloud storage
        # service and get the URL. For this example, we'll just use the filename.
        attachment_url = file.filename

    message_in.attachment_url = attachment_url
    message = crud.message.create_with_owner(
        db=db, obj_in=message_in, sender_id=current_user.id
    )
    return message

@router.get("/", response_model=List[schemas.InternalMessage])
def read_messages(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve messages for the current user.
    """
    messages = crud.message.get_multi_by_user(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return messages