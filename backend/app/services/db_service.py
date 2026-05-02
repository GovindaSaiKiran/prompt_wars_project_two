import logging
from datetime import datetime, timezone
from firebase_admin import firestore

logger = logging.getLogger(__name__)

class DBService:
    def __init__(self):
        self.db = None
        try:
            # Firestore client initializes automatically if firebase_admin is initialized
            self.db = firestore.client()
            logger.info("Firestore client initialized successfully.")
        except Exception as e:
            logger.warning(f"Firestore not available. Logging to DB will be skipped. Error: {e}")

    def log_chat(self, uid: str, question: str, answer: str) -> None:
        """
        Asynchronously log the chat to Firestore to track analytics and history without blocking the main thread.
        """
        if not self.db:
            return

        try:
            doc_ref = self.db.collection("chat_history").document()
            doc_ref.set({
                "uid": uid,
                "question": question,
                "answer": answer,
                "timestamp": datetime.now(timezone.utc)
            })
        except Exception as e:
            logger.error(f"Failed to log chat to Firestore: {e}")

db_service = DBService()
