from unittest.mock import patch, MagicMock
from app.services.ai_service import AIService
from app.services.db_service import DBService

import asyncio

def test_ai_service_demo_fallback():
    # If API key is not set, it should return demo responses
    with patch("app.services.ai_service.settings.GEMINI_API_KEY", "your_api_key_here"):
        service = AIService()
        assert service.model is None
        
        response = service.generate_response("Am I eligible to vote?")
        response = asyncio.run(service.generate_response("Am I eligible to vote?"))
        assert "Eligibility Checker" in response

        response = asyncio.run(service.generate_response("Random question"))
        assert "demo mode" in response

@patch("app.services.ai_service.genai.GenerativeModel")
def test_ai_service_active(mock_model_class):
    mock_model_instance = MagicMock()
    # Mock the response object from Gemini
    mock_response = MagicMock()
    mock_response.text = "This is a real AI answer."
    mock_response.prompt_feedback = None
    mock_model_instance.generate_content.return_value = mock_response
    mock_model_class.return_value = mock_model_instance

    with patch("app.services.ai_service.settings.GEMINI_API_KEY", "valid_key"):
        service = AIService()
        
        answer = asyncio.run(service.generate_response("How do I vote?"))
        assert answer == "This is a real AI answer."
        mock_model_instance.generate_content.assert_called_once()

@patch("app.services.db_service.firestore.client")
def test_db_service_log_chat(mock_firestore_client):
    mock_db = MagicMock()
    mock_collection = MagicMock()
    mock_document = MagicMock()
    
    mock_firestore_client.return_value = mock_db
    mock_db.collection.return_value = mock_collection
    mock_collection.document.return_value = mock_document
    
    service = DBService()
    service.log_chat("user1", "question", "answer")
    
    mock_db.collection.assert_called_with("chat_history")
    mock_collection.document.assert_called_once()
    mock_document.set.assert_called_once()
