
import logging
from datetime import datetime

from sqlalchemy.future import select
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

import schemas.spendings as schema_pendings
from models import Spending


logger = logging.getLogger("uvicorn")


def add_spending(session, spending: schema_pendings.Spending):
    try:
        spending_add = Spending(**spending.dict(), spent_at=datetime.now())
        session.add(spending_add)
        session.commit()
        return spending_add
    except Exception as ex:
        session.rollback()
        logger.error(f"Unable to add spending {ex}")
        raise HTTPException(
            status_code=500, detail="Unable to add spending")


def get_spendings(session):
    try:
        spendings = session.query(Spending).all()
        return spendings
    except Exception as ex:
        logger.error(f"Unable to select spendings {ex}")
        raise HTTPException(
            status_code=500, detail="Unable to select spendings")
