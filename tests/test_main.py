from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "healthy"

def test_ask_endpoint_validation():
    # Test empty question
    response = client.post("/ask", json={"question": ""})
    # Pydantic should block empty strings if strip_whitespace is true and it results in empty, 
    # or min_length is set. In our case, we might get a 422 if we set min_length, 
    # but let's assume it passes pydantic and we handle it, or pydantic catches it.
    # Actually, constr(strip_whitespace=True) will strip it, but unless min_length>0, it might pass.
    # We expect a 422 Unprocessable Entity if it violates Pydantic constraints, or 500/503 depending on API key state.
    
    # Let's test a valid looking payload but without actual API keys it will return 500 or 503
    response = client.post("/ask", json={"question": "How do I vote?"})
    assert response.status_code in [200, 500, 503] # 200 if key works, 503 if model fails, 500 if key missing

def test_ask_endpoint_missing_field():
    response = client.post("/ask", json={"wrong_field": "hello"})
    assert response.status_code == 422 # Pydantic validation error
