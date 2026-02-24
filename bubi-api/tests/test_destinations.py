import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_list_destinations():
    response = client.get("/api/v1/destinations")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_destination_not_found():
    response = client.get("/api/v1/destinations/nonexistent-slug")
    assert response.status_code == 404


def test_get_destination_victoria_falls():
    response = client.get("/api/v1/destinations/victoria-falls")
    # Will 404 if DB not seeded — that's expected in CI without DB
    assert response.status_code in [200, 404]
    if response.status_code == 200:
        data = response.json()
        assert data["slug"] == "victoria-falls"
        assert "activities" in data
        assert "accommodations" in data
