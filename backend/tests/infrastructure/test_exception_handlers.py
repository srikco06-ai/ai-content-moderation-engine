"""
Tests for global exception handlers.
"""

from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

from app.exception_handlers import register_exception_handlers


class TestExceptionHandlers:
    """
    Tests for registered exception handlers.
    """

    def setup_method(self) -> None:
        """
        Create a temporary FastAPI application for testing.
        """

        self.app = FastAPI()

        register_exception_handlers(self.app)

        @self.app.get("/http-error")
        def http_error() -> None:
            raise HTTPException(
                status_code=404,
                detail="Resource not found",
            )

        @self.app.get("/server-error")
        def server_error() -> None:
            raise RuntimeError(
                "Unexpected failure",
            )

        @self.app.post("/validation")
        def validation(
            data: dict,
        ) -> dict:
            return data

        self.client = TestClient(
            self.app,
            raise_server_exceptions=False,
        )

    def test_http_exception_handler(self) -> None:
        """
        HTTPException should preserve status code and detail.
        """

        response = self.client.get("/http-error")

        assert response.status_code == 404

        assert response.headers["content-type"].startswith("application/json")

        assert response.json() == {
            "detail": "Resource not found",
        }

    def test_validation_exception_handler(self) -> None:
        """
        Validation errors should return HTTP 422.
        """

        response = self.client.post(
            "/validation",
            data="invalid-json",
            headers={
                "Content-Type": "application/json",
            },
        )

        assert response.status_code == 422

        body = response.json()

        assert isinstance(
            body,
            dict,
        )

        assert "detail" in body

        assert isinstance(
            body["detail"],
            list,
        )

        assert len(body["detail"]) > 0

    def test_generic_exception_handler(self) -> None:
        """
        Unhandled exceptions should return HTTP 500.
        """

        response = self.client.get(
            "/server-error",
        )

        assert response.status_code == 500

        assert response.headers["content-type"].startswith("application/json")

        body = response.json()

        assert body == {"detail": ("An unexpected internal server error occurred.")}
