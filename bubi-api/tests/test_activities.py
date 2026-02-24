from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_activities():
    r = client.get("/api/v1/activities")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_filter_activities_by_category():
    r = client.get("/api/v1/activities?category=wildlife")
    assert r.status_code == 200


def test_activity_not_found():
    r = client.get("/api/v1/activities/99999")
    assert r.status_code == 404
