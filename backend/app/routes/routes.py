"""API routes for the CivicGuide Smart Election Assistant."""
import logging
import asyncio
from fastapi import APIRouter, Depends, Request
from app.models.schemas import AskRequest, AskResponse
from app.services.ai_service import ai_service
from app.services.db_service import db_service
from app.utils.auth import verify_token
from app.utils.security import limiter

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/ask", response_model=AskResponse)
@limiter.limit("10/minute")
async def ask_assistant(request: Request, body: AskRequest, token: dict = Depends(verify_token)):
    """
    Ask the AI election assistant a question.

    Rate limited to 10 requests per minute per IP.
    Optionally authenticated via Firebase ID token.
    """
    uid = token.get("uid", "anonymous")

    # Generate AI response (cached under the hood)
    answer = await ai_service.generate_response(body.question)

    # Log to Firestore in the background (fire-and-forget)
    async def _safe_log():
        try:
            await asyncio.to_thread(db_service.log_chat, uid, body.question, answer)
        except Exception as e:
            logger.warning(f"Background Firestore log failed: {e}")

    asyncio.create_task(_safe_log())

    return AskResponse(answer=answer)
