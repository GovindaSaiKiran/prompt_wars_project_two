from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Smart Election Assistant API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Gemini API
    GEMINI_API_KEY: Optional[str] = None
    
    # Firebase settings (can be inferred from environment in Cloud Run)
    FIREBASE_PROJECT_ID: Optional[str] = None
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["*"]
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
