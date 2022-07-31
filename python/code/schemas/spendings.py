from datetime import datetime
from pydantic import BaseModel, Field


class SpendingCreate(BaseModel):
    description: str
    amount: float = Field(
        gt=0, description="The amount must be greater than zero")
    currency: str

    class Config:
        orm_mode = True


class Spending(BaseModel):
    id: int
    description: str
    amount: float
    currency: str
    spent_at: datetime

    class Config:
        orm_mode = True
