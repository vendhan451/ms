from fastapi import APIRouter

from app.api.routers import auth, users, projects, reports, leave, billing, messaging, calendar

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(leave.router, prefix="/leave", tags=["leave"])
api_router.include_router(billing.router, prefix="/billing", tags=["billing"])
api_router.include_router(messaging.router, prefix="/messages", tags=["messaging"])
api_router.include_router(calendar.router, prefix="/calendar", tags=["calendar"])