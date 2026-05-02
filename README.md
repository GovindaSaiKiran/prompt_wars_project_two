# Smart Election Assistant

## Problem Statement
The electoral process can be complex and overwhelming for many citizens. There is a need for an intelligent, guided digital civic assistant that helps users understand the election process, timelines, and voting steps in an interactive, easy-to-follow, and visually guided way, strictly adhering to the Election Commission of India (ECI) guidelines.

## Features
- **Interactive AI Chat:** Powered by Gemini 1.5 Flash to answer civics questions.
- **Guided UI:** Quick action buttons for common queries (Eligibility, Timelines, Steps).
- **Visual Timeline:** Step-by-step breakdown of the general election process.
- **Modern Aesthetic:** Glassmorphism UI with responsive design.
- **Accessible:** Semantic HTML, ARIA labels, and keyboard navigation support.
- **Secure Backend:** FastAPI server validating requests and protecting API keys.

## Security Practices
- **Environment Variables:** API keys are never exposed in the frontend; they are securely injected into the backend via environment variables.
- **Rate Limiting:** IP-based rate limiting (via `slowapi`) prevents API abuse and bot spamming.
- **Strict Content Security Policy (CSP):** The backend strictly dictates which resources can be loaded by the browser.
- **Prompt Injection Mitigation:** AI prompts are strictly bounded to prevent malicious instructions from overriding core behavior.
- **Data Validation:** All incoming requests are validated using Pydantic models.

## Architecture

```text
[ User Browser ]
      |
      | (HTTP/JSON)
      v
[ Google Cloud Run (Container) ]
      |
      |-- Frontend (Static HTML/CSS/JS served by FastAPI)
      |
      |-- Backend (FastAPI + Pydantic Validation)
            |
            | (gRPC / HTTP)
            v
[ Google Gemini API ]
```

## Local Setup

### Prerequisites
- Python 3.11+
- A Google Gemini API Key

### Steps

1. **Clone the repository** (if pushed to GitHub):
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Set up a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Set environment variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Run the server**:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```

6. **Access the app**:
   Open `http://localhost:8000` in your browser.

## Testing
To run the automated tests:
```bash
pytest tests/
```

## Deployment to Google Cloud Run

Follow these exact commands using the Google Cloud CLI.

1. **Initialize and Login**:
   ```bash
   gcloud init
   gcloud auth login
   ```

2. **Set the Project**:
   ```bash
   gcloud config set project proven-serenity-494705-u8
   ```

3. **Deploy from Source**:
   *Note: Ensure your `GEMINI_API_KEY` is ready. We will set it as an environment variable during deployment.*
   ```bash
   gcloud run deploy smart-election-assistant \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="your_actual_api_key_here"
   ```
   *(For better security in production, consider using Google Secret Manager via `--set-secrets`)*

4. **Visit your live app**:
   Click the Service URL provided in the terminal output.

## Future Improvements
- Multi-language support (Hindi, regional languages) using Gemini's translation capabilities.
- Integration with official ECI APIs (if available) for real-time voter roll lookup.
- PWA (Progressive Web App) support for offline usage.