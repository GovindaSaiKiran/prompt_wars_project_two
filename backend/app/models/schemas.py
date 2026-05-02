from pydantic import BaseModel, Field
from pydantic.types import StringConstraints
from typing import Annotated

class AskRequest(BaseModel):
    # Sanitize and limit input length to prevent abuse (XSS/Injection mitigation)
    question: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=500)] = Field(
        ..., description="The user's question regarding the election."
    )

class AskResponse(BaseModel):
    answer: str = Field(..., description="The AI assistant's response.")
