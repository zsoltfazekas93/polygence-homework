from typing import List, Union
import logging

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn

from db import engine, Base, get_session

import crud.spendings as crud_pendings
import schemas.spendings as schema_pendings


logger = logging.getLogger("uvicorn")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event(session: Session = Depends(get_session)):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    logger.info("Tables created")


@app.get("/api/spendings", response_model=Union[List[schema_pendings.Spending], List])
def get_spendings(session: Session = Depends(get_session)):
    return crud_pendings.get_spendings(session)


@app.post("/api/spending", response_model=schema_pendings.Spending)
def post_spending(spending: schema_pendings.SpendingCreate,
                  session: Session = Depends(get_session)
                  ):
    return crud_pendings.add_spending(session, spending)


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=True)
