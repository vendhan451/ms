from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.api.routers.users import check_is_admin

router = APIRouter()

@router.post("/", response_model=schemas.Project, dependencies=[Depends(check_is_admin)])
def create_project(
    *,
    db: Session = Depends(deps.get_db),
    project_in: schemas.ProjectCreate,
) -> Any:
    """
    Create new project.
    """
    project = crud.project.create(db, obj_in=project_in)
    return project

@router.get("/", response_model=List[schemas.Project])
def read_projects(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve projects.
    """
    projects = crud.project.get_multi(db, skip=skip, limit=limit)
    return projects

@router.put("/{project_id}", response_model=schemas.Project, dependencies=[Depends(check_is_admin)])
def update_project(
    *,
    db: Session = Depends(deps.get_db),
    project_id: int,
    project_in: schemas.ProjectUpdate,
) -> Any:
    """
    Update a project.
    """
    project = crud.project.get(db, id=project_id)
    if not project:
        raise HTTPException(
            status_code=404,
            detail="The project with this ID does not exist in the system",
        )
    project = crud.project.update(db, db_obj=project, obj_in=project_in)
    return project

@router.delete("/{project_id}", response_model=schemas.Project, dependencies=[Depends(check_is_admin)])
def delete_project(
    *,
    db: Session = Depends(deps.get_db),
    project_id: int,
) -> Any:
    """
    Delete a project.
    """
    project = crud.project.get(db, id=project_id)
    if not project:
        raise HTTPException(
            status_code=404,
            detail="The project with this ID does not exist in the system",
        )
    project = crud.project.remove(db, id=project_id)
    return project