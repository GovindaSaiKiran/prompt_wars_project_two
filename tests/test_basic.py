from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_security_headers_present():
    response = client.get("/health")
    headers = response.headers
    assert "x-content-type-options" in headers
    assert headers["x-content-type-options"] == "nosniff"
    assert "strict-transport-security" in headers
    assert "x-frame-options" in headers
    assert "content-security-policy" in headers
    assert "unsafe-eval" not in headers.get("content-security-policy","")

def test_ask_rejects_oversized_input():
    response = client.post("/ask", json={"question": "a" * 501})
    assert response.status_code == 422

def test_ask_rejects_empty_string():
    response = client.post("/ask", json={"question": ""})
    assert response.status_code == 422

def test_ask_rejects_whitespace_only():
    response = client.post("/ask", json={"question": "   "})
    assert response.status_code == 422
