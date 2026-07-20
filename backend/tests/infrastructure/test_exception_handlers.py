"""
Tests for global exception handlers.
"""

from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

from app.exception_handlers import register_exception_handlers


class TestExceptionHandlers:
    """
    Tests for registered exception handlers.
    """

    def setup_method(self):
        """
        Create a temporary FastAPI app for testing.
        """

        self.app = FastAPI()

        register_exception_handlers(self.app)

        @self.app.get("/http-error")
        def http_error():
            raise HTTPException(
                status_code=404,
                detail="Resource not found",
            )

        @self.app.get("/server-error")
        def server_error():
            raise RuntimeError("Unexpected failure")

        @self.app.post("/validation")
        def validation(data: dict):
            return data

        self.client = TestClient(
            self.app,
            raise_server_exceptions=False,
        )

    def test_http_exception_handler(self):
        """
        HTTPException should preserve status code and detail.
        """

        response = self.client.get("/http-error")

        assert response.status_code == 404

        assert response.json() == {
            "detail": "Resource not found",
        }

    def test_validation_exception_handler(self):
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

        assert "detail" in body

        assert isinstance(body["detail"], list)

    def test_generic_exception_handler(self):
        """
        Unhandled exceptions should return HTTP 500.
        """

        response = self.client.get("/server-error")

        assert response.status_code == 500

        assert response.json() == {
            "detail": (
                "An unexpected internal server error occurred."
            )
        }