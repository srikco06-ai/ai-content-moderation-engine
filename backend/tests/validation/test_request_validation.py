"""
Request validation tests.
"""

from fastapi.testclient import TestClient


class TestRequestValidation:
    """
    Tests for request body validation.
    """

    def test_missing_text_field(
        self,
        client: TestClient,
    ) -> None:
        """Missing text field should return 422."""

        response = client.post(
            "/predict",
            json={},
        )

        assert response.status_code == 422

        data = response.json()

        assert "detail" in data

    def test_empty_text(
        self,
        client: TestClient,
    ) -> None:
        """Empty text should fail validation."""

        response = client.post(
            "/predict",
            json={
                "text": ""
            },
        )

        assert response.status_code == 422

    def test_null_text(
        self,
        client: TestClient,
    ) -> None:
        """Null text should fail validation."""

        response = client.post(
            "/predict",
            json={
                "text": None
            },
        )

        assert response.status_code == 422

    def test_integer_text(
        self,
        client: TestClient,
    ) -> None:
        """Integer text should fail validation."""

        response = client.post(
            "/predict",
            json={
                "text": 12345
            },
        )

        assert response.status_code == 422

    def test_list_text(
        self,
        client: TestClient,
    ) -> None:
        """List should fail validation."""

        response = client.post(
            "/predict",
            json={
                "text": ["hello"]
            },
        )

        assert response.status_code == 422

    def test_dictionary_text(
        self,
        client: TestClient,
    ) -> None:
        """Dictionary should fail validation."""

        response = client.post(
            "/predict",
            json={
                "text": {
                    "value": "hello"
                }
            },
        )

        assert response.status_code == 422

    def test_validation_response_contains_detail(
        self,
        client: TestClient,
    ) -> None:
        """Validation response should contain detail."""

        response = client.post(
            "/predict",
            json={},
        )

        data = response.json()

        assert response.status_code == 422
        assert "detail" in data
        assert isinstance(data["detail"], list)

    def test_validation_error_location(
        self,
        client: TestClient,
    ) -> None:
        """Validation error should reference the text field."""

        response = client.post(
            "/predict",
            json={},
        )

        data = response.json()

        first_error = data["detail"][0]

        assert "loc" in first_error
        assert first_error["loc"][-1] == "text"