from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import requests
import os

from . import database, models

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "YOUR_API_KEY")   # 🔑 Replace with your OpenWeather API key

@app.post("/fetch/{city}")
def fetch_weather(city: str, db: Session = Depends(get_db)):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    r = requests.get(url)
    data = r.json()

    if r.status_code != 200:
        return {"error": data.get("message", "Failed to fetch")}

    weather = models.Weather(
        city=city,
        description=data["weather"][0]["description"],
        temperature=data["main"]["temp"]
    )
    db.add(weather)
    db.commit()
    db.refresh(weather)
    return weather

@app.get("/weather")
def get_weather(db: Session = Depends(get_db)):
    return db.query(models.Weather).all()
