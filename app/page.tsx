import type { Metadata } from "next";
import MainDashboard from "../components/dashboard/MainDashboard";
import { DroneState } from "../types/drone";

export const metadata: Metadata = {
  title: "Drone Control Dashboard - Live Flight Control System",
  description:
    "Professional drone control interface with real-time telemetry, live video streaming, and advanced flight controls for DJI Mavic Pro and compatible drones.",
  openGraph: {
    title: "Professional Drone Control Dashboard",
    description:
      "Advanced flight control system with real-time telemetry and live video streaming",
    type: "website",
  },
};

// Mock initial drone state - replace with actual API data
const getInitialDroneState = (): DroneState => ({
  status: {
    id: "drone-001",
    name: "DJI Mavic Pro",
    model: "Mavic Pro",
    firmware: "FPG N2 • Firmware Live Feed",
    isConnected: true,
    lastUpdated: new Date(),
  },
  battery: {
    percentage: 75,
    voltage: 11.4,
    temperature: 25,
    cycleCount: 45,
    estimatedFlightTime: 18,
    lastChargedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  },
  flight: {
    speed: 20,
    altitude: 80,
    distance: 150,
    flightTime: "05:43",
    coordinates: {
      latitude: 14.4522,
      longitude: -17.0089,
    },
    heading: 45,
    homePoint: {
      latitude: 14.4522,
      longitude: -17.0089,
    },
  },
  camera: {
    resolution: "4K",
    fps: 30,
    iso: 600,
    shutter: 180.0,
    isRecording: false,
    recordingTime: "02:09",
    storageRemaining: 64,
    mode: "video",
  },
  telemetry: {
    speed: 20,
    ldis: 25,
    height: 80,
    iso: 600,
    flightTime: "05:43",
    shutter: 180.0,
    frameLines: ["1920 × 1080", "1280 × 720", "854 × 480", "640 × 360"],
    temperature: 25,
    signalStrength: 85,
  },
  controls: {
    isArmed: false,
    flightMode: "manual",
    gpsMode: true,
    obstacleAvoidance: true,
    returnToHomeHeight: 120,
  },
  liveStream: {
    url: "rtmp://stream.example.com/live",
    quality: "4K",
    latency: 150,
    bitrate: 8000,
    isStreaming: true,
  },
  ui: {
    showGrid: true,
    showMap: true,
    showJoystick: false, // Default toggle off (but not disabled)
    showTelemetry: true,
    theme: "dark",
  },
  map: {
    viewStyle: "satellite",
    zoom: 15,
    showFlightPath: true,
    showNoFlyZones: false,
    mapSize: "medium",
  },
});

export default function HomePage() {
  const initialDroneState = getInitialDroneState();

  return (
    <main className="w-full h-screen">
      <MainDashboard initialDroneState={initialDroneState} />
    </main>
  );
}
