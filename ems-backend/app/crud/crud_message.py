from typing import List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.internal_message import InternalMessage
from app.schemas.internal_message import (
    InternalMessageCreate,
    InternalMessageUpdate,
)


class CRUDInternalMessage(
    CRUDBase[InternalMessage, InternalMessageCreate, InternalMessageUpdate]
):
    def create_with_owner(
        self, db: Session, *, obj_in: InternalMessageCreate, sender_id: int
    ) -> InternalMessage:
        db_obj = InternalMessage(
            content=obj_in.content,
            attachment_url=obj_in.attachment_url,
            sender_id=sender_id,
            recipient_id=obj_in.recipient_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_user(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[InternalMessage]:
        return (
            db.query(self.model)
            .filter(
                (InternalMessage.sender_id == user_id)
                | (InternalMessage.recipient_id == user_id)
                | (InternalMessage.recipient_id == None)
            )
            .offset(skip)
            .limit(limit)
            .all()
        )


message = CRUDInternalMessage(InternalMessage)