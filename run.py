import uvicorn

if __name__ == "__main__":
    uvicorn.run(
       app="main:app",
       host= "localhost",
       reload=True,
       port=8000,
    )