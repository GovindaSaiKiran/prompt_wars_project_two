from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from fastapi import FastAPI
from slowapi.errors import RateLimitExceeded

# Initialize the rate limiter using the client's IP address
limiter = Limiter(key_func=get_remote_address)

def setup_security(app: FastAPI) -> None:
    """Configures rate limiting and exception handlers for the app."""
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
