import logging
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import auth

logger = logging.getLogger(__name__)

# Initialize Firebase Admin App
try:
    # If deployed on Cloud Run, it automatically uses the default service account
    # For local dev without GOOGLE_APPLICATION_CREDENTIALS, this will throw an error
    firebase_admin.get_app()
except ValueError:
    try:
        firebase_admin.initialize_app()
        logger.info("Firebase Admin initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize Firebase Admin: {e}")

security = HTTPBearer(auto_error=False)

async def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Verify the Firebase ID Token from the Authorization header.
    Returns the decoded token dictionary.
    """
    if not credentials:
        # For the hackathon, we allow anonymous/unauthenticated access if no token is provided.
        # Change this to raise HTTPException if strict auth is required.
        return {"uid": "anonymous", "email": "anonymous@demo.local"}

    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        logger.error(f"Error verifying Firebase token: {e}")
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
