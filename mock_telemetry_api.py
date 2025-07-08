from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/telemetry")
def get_telemetry():
    signal_strength = random.uniform(50, 100)
    signal = "Strong" if signal_strength > 75 else "Weak"
    signal_bars = min(4, max(1, int(signal_strength // 25)))  # 1-4 bars
    data = {
        "battery": random.randint(20, 100),
        "altitude": random.randint(0, 120),
        "max_altitude": 500,
        "speed": random.randint(0, 25),
        "max_speed": 25,
        "signal": signal,
        "signal_bars": signal_bars,
        "resolution": "4K",
        "frame_rate": 30,
        "flight_time": 135,  # seconds (e.g., 2:15)
        "flight_time_remaining": 1125,  # seconds (e.g., 18:45)
    }
    return data 