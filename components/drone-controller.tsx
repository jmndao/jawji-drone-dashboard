"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Navigation,
  Battery,
  Gauge,
  Clock,
  MapPin,
  CloudRain,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Wifi,
  Radio,
  Home,
  Square,
  RotateCcw,
} from "lucide-react"
import Image from "next/image"

// Telemetry type matches backend
type Telemetry = {
  battery: number;
  altitude: number;
  max_altitude: number;
  speed: number;
  max_speed: number;
  signal: string;
  signal_bars: number;
  resolution: string;
  frame_rate: number;
  flight_time: number;
  flight_time_remaining: number;
};

const TELEMETRY_API = "http://localhost:8000/telemetry";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function DroneController() {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch(TELEMETRY_API);
        const data = await res.json();
        setTelemetry(data);
      } catch (err) {
        setTelemetry(null);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!telemetry) return <div>Loading...</div>;

  return (
    <div className="drone-dashboard">
      <div className="drone-header">
        <img src="/jawu-drone1.png" alt="Drone" style={{ width: 200, margin: "0 auto", display: "block" }} />
        <h2 style={{ color: "#ff8800", textAlign: "center", fontWeight: "bold", fontSize: 32 }}>Jawji Mini Drone</h2>
      </div>
      <div className="drone-telemetry-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
        <div className="telemetry-card" style={{ background: "#f7f7f7", borderRadius: 16, padding: 20, textAlign: "center", boxShadow: "0 2px 8px #0001" }}>
          <div style={{ color: "#888" }}>Battery</div>
          <div style={{ color: "#1db954", fontWeight: "bold", fontSize: 28 }}>{telemetry.battery}%</div>
          <div style={{ height: 6, background: "#e0e0e0", borderRadius: 3, margin: "8px 0" }}>
            <div style={{ width: `${telemetry.battery}%`, height: 6, background: "#1db954", borderRadius: 3 }} />
          </div>
        </div>
        <div className="telemetry-card" style={{ background: "#f7f7f7", borderRadius: 16, padding: 20, textAlign: "center", boxShadow: "0 2px 8px #0001" }}>
          <div style={{ color: "#888" }}>Altitude</div>
          <div style={{ fontWeight: "bold", fontSize: 28 }}>{telemetry.altitude}m</div>
          <div style={{ color: "#aaa" }}>Max: {telemetry.max_altitude}m</div>
          </div>
        <div className="telemetry-card" style={{ background: "#f7f7f7", borderRadius: 16, padding: 20, textAlign: "center", boxShadow: "0 2px 8px #0001" }}>
          <div style={{ color: "#888" }}>Speed</div>
          <div style={{ fontWeight: "bold", fontSize: 24 }}>{telemetry.speed} m/s</div>
          <div style={{ color: "#aaa" }}>Max: {telemetry.max_speed} m/s</div>
        </div>
        <div className="telemetry-card" style={{ background: "#f7f7f7", borderRadius: 16, padding: 20, textAlign: "center", boxShadow: "0 2px 8px #0001" }}>
          <div style={{ color: "#888" }}>Signal</div>
          <div style={{ color: "#1db954", fontWeight: "bold", fontSize: 22 }}>{telemetry.signal}</div>
          <div style={{ color: "#1db954", fontSize: 20 }}>{"I".repeat(telemetry.signal_bars)}</div>
        </div>
        <div className="telemetry-card" style={{ background: "#f7f7f7", borderRadius: 16, padding: 20, textAlign: "center", boxShadow: "0 2px 8px #0001" }}>
          <div style={{ color: "#888" }}>Resolution</div>
          <div style={{ fontWeight: "bold", fontSize: 24 }}>{telemetry.resolution}</div>
          <div style={{ color: "#aaa" }}>{telemetry.frame_rate} FPS</div>
        </div>
        <div className="telemetry-card" style={{ background: "#f7f7f7", borderRadius: 16, padding: 20, textAlign: "center", boxShadow: "0 2px 8px #0001" }}>
          <div style={{ color: "#888" }}>Flight Time</div>
          <div style={{ fontWeight: "bold", fontSize: 24 }}>{formatTime(telemetry.flight_time)}</div>
          <div style={{ color: "#aaa" }}>Remaining: {formatTime(telemetry.flight_time_remaining)}</div>
        </div>
      </div>
    </div>
  );
}
