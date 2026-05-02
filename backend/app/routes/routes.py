from fastapi import APIRouter, Depends, Request
from app.models.schemas import AskRequest, AskResponse
from app.services.ai_service import ai_service
from app.services.db_service import db_service
from app.utils.auth import verify_token
from app.utils.security import limiter
import asyncio

router = APIRouter()

@router.post("/ask", response_model=AskResponse)
@limiter.limit("10/minute")
async def ask_assistant(request: Request, body: AskRequest, token: dict = Depends(verify_token)):
    """
    Endpoint for asking the Smart Election Assistant a question.
    Rate limited to 10 requests per minute per IP to prevent abuse.
    Requires a valid Firebase ID token (or falls back to anonymous if not strictly enforced).
    """
    uid = token.get("uid", "unknown")
    
    # Generate response via AI Service (cached under the hood)
    answer = await ai_service.generate_response(body.question)
    
    # Log to Firestore asynchronously in the background so it doesn't block the API response
    asyncio.create_task(
        asyncio.to_thread(db_service.log_chat, uid, body.question, answer)
    )
    
    return AskResponse(answer=answer)
