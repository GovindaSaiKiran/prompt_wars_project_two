"""Test configuration and fixtures for the CivicGuide test suite."""
import sys
import os

# Set mock API key BEFORE any app imports to prevent RuntimeError
os.environ.setdefault("GEMINI_API_KEY", "mock_key_for_testing")

# Add the backend directory to sys.path so tests can import from 'app'
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)
