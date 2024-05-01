from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https*://[localhost|\d+\.\d+\.\d+.\d+].*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def test_api():
    return "hello world"


@app.get("/items/")
def read_items():
    return [{"name": "Empanada"}, {"name": "Arepa"}]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app)
