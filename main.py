from fastapi import FastAPI
from books import book_router
from database import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Library API", description="This is a simple API for a Library service"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def connect():
    await init_db()


app.include_router(book_router,tags=["books"], prefix="/books")