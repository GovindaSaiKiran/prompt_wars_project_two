from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

@patch("app.routes.routes.ai_service.generate_response", new_callable=AsyncMock)
@patch("app.routes.routes.db_service.log_chat")
@patch("app.utils.auth.auth.verify_id_token")
def test_ask_endpoint_authenticated(mock_verify_token, mock_log_chat, mock_generate_response):
    # Setup mocks
    mock_verify_token.return_value = {"uid": "user123"}
    mock_generate_response.return_value = "This is a mocked AI response."

    headers = {"Authorization": "Bearer fake-token"}
    data = {"question": "How do I vote?"}
    
    response = client.post("/ask", headers=headers, json=data)
    
    assert response.status_code == 200
    assert response.json() == {"answer": "This is a mocked AI response."}
    
    # Verify AI service was called with the right question
    mock_generate_response.assert_called_once_with("How do I vote?")

@patch("app.routes.routes.ai_service.generate_response", new_callable=AsyncMock)
def test_ask_endpoint_unauthenticated_fallback(mock_generate_response):
    # If no token is provided, our auth setup currently falls back to anonymous
    mock_generate_response.return_value = "Mock response"
    
    data = {"question": "When are the elections?"}
    response = client.post("/ask", json=data)
    
    assert response.status_code == 200
    assert response.json() == {"answer": "Mock response"}

def test_ask_endpoint_validation_error():
    # Empty question should fail
    response = client.post("/ask", json={"question": ""})
    assert response.status_code == 422 # Unprocessable Entity
    
    # Missing question should fail
    response = client.post("/ask", json={"wrong_key": "hello"})
    assert response.status_code == 422
