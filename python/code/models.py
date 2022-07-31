from sqlalchemy import Column, Float, String, Integer, DateTime
from sqlalchemy.sql import func

from db import Base


class Spending(Base):
    __tablename__ = "Spendings"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float)
    currency = Column(String)
    spent_at = Column(DateTime, default=func.now())
