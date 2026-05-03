"""Tests for FastAPI application endpoints and middleware."""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """Health endpoint should return 200 with status and AI readiness."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "ai_service_ready" in data
    assert "version" in data


def test_ask_endpoint_rejects_empty_question():
    """Empty question should return 422 validation error."""
    response = client.post("/ask", json={"question": ""})
    assert response.status_code == 422


def test_ask_endpoint_rejects_missing_field():
    """Missing 'question' field should return 422."""
    response = client.post("/ask", json={"wrong_field": "hello"})
    assert response.status_code == 422


def test_ask_endpoint_rejects_oversized_input():
    """Questions exceeding 500 chars should return 422."""
    response = client.post("/ask", json={"question": "a" * 501})
    assert response.status_code == 422
