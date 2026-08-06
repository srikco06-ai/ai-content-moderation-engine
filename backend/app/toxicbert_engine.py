"""
Production ToxicBERT inference engine.

Responsibilities
----------------
* Lazy singleton model loading
* Thread-safe initialization
* Hugging Face model inference
* Device management
* Probability prediction

This module intentionally contains NO business logic.

Business rules such as:
- Safe vs Toxic
- confidence
- risk_score
- thresholds

belong inside services.py.
"""

from __future__ import annotations

import threading
import time

import torch
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
)

from app.config import settings
from app.logging_config import get_logger

logger = get_logger(__name__)


class ToxicBertEngine:
    """
    Production singleton wrapper around the Hugging Face ToxicBERT model.

    Features
    --------
    * Lazy loading
    * Thread-safe initialization
    * CPU/CUDA support
    * Warmup support
    """

    _instance: "ToxicBertEngine | None" = None
    _instance_lock = threading.Lock()

    def __new__(cls) -> "ToxicBertEngine":
        if cls._instance is None:
            with cls._instance_lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)

                    cls._instance._initialized = False
                    cls._instance._model_loaded = False
                    cls._instance._model_lock = threading.Lock()

        return cls._instance

    def __init__(self) -> None:
        if self._initialized:
            return

        self.model: AutoModelForSequenceClassification | None = None
        self.tokenizer: AutoTokenizer | None = None

        self.device = self._resolve_device()

        self._initialized = True

    @staticmethod
    def _resolve_device() -> torch.device:
        """
        Resolve inference device.

        Falls back to CPU when CUDA is unavailable.
        """

        requested = settings.HF_DEVICE.lower()

        if requested == "cuda":
            if torch.cuda.is_available():
                logger.info("Using CUDA for inference.")
                return torch.device("cuda")

            logger.warning("CUDA requested but unavailable. Falling back to CPU.")

        return torch.device("cpu")

    def _load_model(self) -> None:
        """
        Load tokenizer and model exactly once.
        """

        logger.info(
            "Loading Hugging Face model '%s'...",
            settings.HF_MODEL_NAME,
        )

        start = time.perf_counter()

        try:
            tokenizer = AutoTokenizer.from_pretrained(
                settings.HF_MODEL_NAME,
            )

            model = AutoModelForSequenceClassification.from_pretrained(
                settings.HF_MODEL_NAME,
            )

            model.to(self.device)
            model.eval()

            self.tokenizer = tokenizer
            self.model = model

            self._model_loaded = True

        except Exception:
            logger.exception("Failed to load Hugging Face model.")
            raise

        elapsed = time.perf_counter() - start

        logger.info(
            "Model loaded successfully in %.2f seconds.",
            elapsed,
        )

    def _ensure_loaded(self) -> None:
        """
        Ensure the model has been loaded.

        Uses double-checked locking.
        """

        if self._model_loaded:
            return

        with self._model_lock:
            if not self._model_loaded:
                self._load_model()

    def warmup(self) -> None:
        """
        Warm up the model.

        Safe to call multiple times.
        """

        self._ensure_loaded()

    def predict(self, text: str) -> dict[str, float]:
        """
        Run transformer inference.

        Parameters
        ----------
        text:
            Preprocessed text.

        Returns
        -------
        dict[str, float]
            Mapping of label -> probability.
        """

        self._ensure_loaded()

        if self.model is None or self.tokenizer is None:
            raise RuntimeError("ToxicBERT model is not loaded.")

        encoded = self.tokenizer(
            text,
            truncation=True,
            max_length=settings.HF_MAX_LENGTH,
            padding=True,
            return_tensors="pt",
        )

        encoded = {key: value.to(self.device) for key, value in encoded.items()}

        start = time.perf_counter()

        with torch.no_grad():
            outputs = self.model(**encoded)
            logits = outputs.logits

            problem_type = getattr(
                self.model.config,
                "problem_type",
                None,
            )

            if problem_type == "single_label_classification":
                probabilities = torch.softmax(logits, dim=-1)
            else:
                probabilities = torch.sigmoid(logits)

        elapsed = time.perf_counter() - start

        logger.debug(
            "Inference completed in %.4f seconds.",
            elapsed,
        )

        scores = probabilities.squeeze(0).detach().cpu().tolist()

        id2label: dict[int, str] = self.model.config.id2label

        return {
            id2label[index].lower(): float(score) for index, score in enumerate(scores)
        }


_engine = ToxicBertEngine()


def get_engine() -> ToxicBertEngine:
    """
    Return the singleton ToxicBERT engine.
    """

    return _engine
