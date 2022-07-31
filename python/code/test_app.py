from datetime import datetime
from typing import List

import pytest
from fastapi.testclient import TestClient

from app import app
from db import Base, engine

client = TestClient(app)

DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%f"


@pytest.fixture()
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_get_spendings(test_db):
    response = client.get("/api/spendings")
    assert response.status_code == 200
    assert response.json() == []


def test_add_get_spending(test_db):

    response = client.get("/api/spendings")
    assert response.status_code == 200
    assert len(response.json()) == 0

    response = client.post(
        "/api/spending", json={"description": "Kiwi", "amount": 12, "currency": "USD", })
    assert response.status_code == 200
    spending_res = response.json()
    assert spending_res["description"] == "Kiwi"
    assert spending_res["amount"] == 12
    assert spending_res["currency"] == "USD"
    assert isinstance(spending_res["id"], int)
    assert isinstance(datetime.strptime(
        spending_res["spent_at"], DATE_FORMAT), datetime)

    response = client.get("/api/spendings")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_add_spending_error_description_missing(test_db):
    response = client.post(
        "/api/spending", json={"amount": 12, "currency": "USD"})
    assert response.status_code == 422
    assert response.json() == {'detail': [{'loc': [
        'body', 'description'], 'msg': 'field required', 'type': 'value_error.missing'}]}


def test_add_spending_error_amount_missing(test_db):
    response = client.post(
        "/api/spending", json={"description": "Mango", "currency": "USD"})
    assert response.status_code == 422
    assert response.json() == {'detail': [{'loc': [
        'body', 'amount'], 'msg': 'field required', 'type': 'value_error.missing'}]}


def test_add_spending_error_amount_not_a_number(test_db):
    response = client.post(
        "/api/spending", json={"description": "Mango", "amount": "ten", "currency": "USD"})
    assert response.status_code == 422
    assert response.json() == {'detail': [{'loc': [
        'body', 'amount'], 'msg': 'value is not a valid float', 'type': 'type_error.float'}]}


def test_add_spending_error_amount_greater_than_zero(test_db):
    response = client.post(
        "/api/spending", json={"description": "Mango", "amount": -10, "currency": "USD"})
    assert response.status_code == 422
    assert response.json() == {'detail': [{'ctx': {'limit_value': 0}, 'loc': [
        'body', 'amount'], 'msg': 'ensure this value is greater than 0', 'type': 'value_error.number.not_gt'}]}
