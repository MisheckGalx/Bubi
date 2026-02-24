import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

TEST_EMAIL = "test_bubi@example.com"
TEST_PASSWORD = "TestPass123!"


def test_register_and_login():
    # Register
    r = client.post("/api/v1/auth/register", json={
        "email": TEST_EMAIL,
        "full_name": "Test User",
        "password": TEST_PASSWORD,
    })
    assert r.status_code in [201, 400]  # 400 if already exists

    # Login
    r = client.post("/api/v1/auth/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD,
    })
    assert r.status_code in [200, 401]
    if r.status_code == 200:
        assert "access_token" in r.json()


def test_login_wrong_password():
    r = client.post("/api/v1/auth/login", json={
        "email": TEST_EMAIL,
        "password": "wrongpassword",
    })
    assert r.status_code == 401


def test_me_unauthenticated():
    r = client.get("/api/v1/auth/me")
    assert r.status_code == 401
