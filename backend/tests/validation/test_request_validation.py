"""
Request validation tests.
"""

from __future__ import annotations

from typing import Any

import pytest
from fastapi.testclient import TestClient


class TestRequestValidation:
    """
    Tests for request body validation.
    """

    @pytest.mark.parametrize(
        "payload",
        [
            {},
            {"text": ""},
            {"text": "      "},
            {"text": None},
            {"text": 12345},
            {"text": ["hello"]},
            {"text": {"value": "hello"}},
        ],
    )
    def test_invalid_requests_return_422(
        self,
        client: TestClient,
        payload: dict[str, Any],
    ) -> None:
        """
        Invalid payloads should return HTTP 422.
        """

        response = client.post(
            "/predict",
            json=payload,
        )

        assert response.status_code == 422

    def test_validation_response_contains_detail(
        self,
        client: TestClient,
    ) -> None:
        """
        Validation response should contain a detail list.
        """

        response = client.post(
            "/predict",
            json={},
        )

        assert response.status_code == 422

        data = response.json()

        assert isinstance(data, dict)

        assert "detail" in data

        assert isinstance(
            data["detail"],
            list,
        )

        assert len(data["detail"]) > 0

    def test_validation_error_location(
        self,
        client: TestClient,
    ) -> None:
        """
        Validation error should reference the text field.
        """

        response = client.post(
            "/predict",
            json={},
        )

        data = response.json()

        first_error = data["detail"][0]

        assert "loc" in first_error

        assert first_error["loc"][-1] == "text"

    def test_validation_error_contains_message(
        self,
        client: TestClient,
    ) -> None:
        """
        Validation error should include a readable message.
        """

        response = client.post(
            "/predict",
            json={},
        )

        data = response.json()

        first_error = data["detail"][0]

        assert "msg" in first_error

        assert isinstance(
            first_error["msg"],
            str,
        )

        assert len(first_error["msg"]) > 0

    def test_validation_error_contains_type(
        self,
        client: TestClient,
    ) -> None:
        """
        Validation error should include an error type.
        """

        response = client.post(
            "/predict",
            json={},
        )

        data = response.json()

        first_error = data["detail"][0]

        assert "type" in first_error

        assert isinstance(
            first_error["type"],
            str,
        )
