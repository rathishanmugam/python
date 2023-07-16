from fastapi import APIRouter, HTTPException
from models import Book
from typing import List
from beanie import PydanticObjectId
from bson import ObjectId

book_router = APIRouter()


@book_router.get("/", response_description="Get new Book",status_code=200)
async def getallbooks() -> List[Book]:
    books = await Book.find_all().to_list()
    return books


@book_router.post("/", response_description="Add new book",status_code=201)
async def createBook(book: Book):
    await book.create()

    return {"message": "Book has been saved"}


@book_router.get("/{book_id}", response_description="Get single  book",status_code=200)
async def retrieveBook(book_id: PydanticObjectId) -> Book:
    print(book_id)
    book_to_get = await Book.get(book_id)
    print(book_to_get)
    return book_to_get


@book_router.put("/{book_id}",response_description="Update  book", status_code=200)
async def updateBook(book: Book, book_id: PydanticObjectId) -> Book:

    book_to_update = await Book.get(book_id)

    if not book_to_update:
        raise HTTPException(status_code=404, detail="Resource not found")

    book_to_update.title = book.title
    book_to_update.author = book.author
    book_to_update.publisher = book.publisher
    book_to_update.date_published = book.date_published.isoformat()
    await book_to_update.save()

    return book_to_update


@book_router.delete("/{book_id}", response_description="Delete book",status_code=204)
async def deleteBook(book_id: PydanticObjectId):
    book_to_delete = await Book.get(book_id)

    await book_to_delete.delete()

    return {"message": "Book deleted"}