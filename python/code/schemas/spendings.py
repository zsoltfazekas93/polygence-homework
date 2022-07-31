from datetime import datetime
from pydantic import BaseModel


class SpendingCreate(BaseModel):
    description: str
    amount: float
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
