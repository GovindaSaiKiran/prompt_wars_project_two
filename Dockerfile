# Use official lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Set environment variables
ENV PYTHONUNBUFFERED=1
# Port MUST be 8080 for Cloud Run
ENV PORT=8080 

WORKDIR /app/backend

# Command to run the FastAPI application
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
