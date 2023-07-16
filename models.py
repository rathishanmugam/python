from datetime import datetime
from beanie import Document, PydanticObjectId
from pydantic import Field
from bson.objectid import ObjectId


class Book(Document):
    title: str = Field(max_length=100)
    author: str = Field(max_length=100)
    publisher: str = Field(max_length=100)
    # is_complete: bool = False
    date_published: datetime = datetime.now()

    class Settings:
        name = "library"

    class Config:
        schema_extra = {
            # "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
            "title": "testtest",
            "author": "test",
            "publisher":"test",
            "date_published": datetime.now()
        }