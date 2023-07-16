import beanie
import motor
import motor.motor_asyncio
from models import Book


async def init_db():   #please provide your credentials otherwise get authentication error from mongo atlas
    client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://username:password@cluster0.vdacpkb.mongodb.net/?retryWrites=true&w=majority")
    await beanie.init_beanie(database=client.db_name, document_models=[Book])