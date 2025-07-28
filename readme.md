# Drone Control Dashboard

A drone control interface built with Next.js and TypeScript, featuring real-time telemetry, live video streaming, and comprehensive flight controls.

## Overview

This application provides a DJI-style control dashboard for drone operations with modular component architecture, type-safe development, and responsive design optimized for professional use.

## Features

- **Live Video Feed**: Real-time streaming with recording capabilities
- **Flight Controls**: Sliding panel with takeoff, landing, emergency stop, and RTH
- **Virtual Joysticks**: Dual stick control (throttle/yaw, pitch/roll)
- **Interactive Map**: Draggable positioning with multiple view styles
- **Telemetry Monitoring**: Real-time data display with compass navigation
- **Safety Systems**: Signal monitoring, battery status, system diagnostics

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Leaflet for mapping
- Lucide React for icons

## Installation

```bash
npm install
npm run dev
```

## Project Structure

```
components/
├── navigation/        # Left sidebar navigation
├── controls/          # Top/bottom control bars, joysticks
├── video/            # Live video feed component
├── telemetry/        # Right sidebar telemetry
├── map/              # Interactive map component
└── dashboard/        # Main orchestrating component

types/drone.ts        # TypeScript definitions
hooks/useDroneState.ts # State management
```

## Backend Integration

The application includes comprehensive TypeScript types and API integration points for real-time drone communication, command sending, and telemetry data synchronization.

## License

MIT License

---

# Drone Technical Terms

## Flight Controls

- **Throttle**: Vertical movement (altitude control)
- **Yaw**: Rotation around vertical axis (left/right turn)
- **Pitch**: Forward/backward movement (nose up/down)
- **Roll**: Lateral movement (banking left/right)
- **RTH**: Return to Home - autonomous return to takeoff point
- **Hover**: Maintaining stationary position in air

## Navigation Systems

- **GPS**: Global Positioning System for location tracking
- **IMU**: Inertial Measurement Unit - gyroscope and accelerometer sensors
- **Compass**: Magnetic heading reference
- **Waypoint**: Pre-programmed GPS coordinate for autonomous flight
- **Geofence**: Virtual boundary limiting flight area
- **No-Fly Zone**: Restricted airspace areas

## Camera/Gimbal

- **Gimbal**: Motorized camera stabilization system
- **FPV**: First Person View - real-time video transmission
- **ISO**: Camera sensor sensitivity to light
- **Shutter**: Exposure time control
- **Frame Rate**: Video frames per second (FPS)
- **Resolution**: Video quality (1080p, 4K, etc.)

## Sensors/Telemetry

- **LDIS**: Laser Distance Sensor for obstacle detection
- **Ultrasonic**: Sound-based proximity sensors
- **Barometer**: Air pressure sensor for altitude measurement
- **OA**: Obstacle Avoidance system
- **RSSI**: Received Signal Strength Indicator
- **Telemetry**: Real-time data transmission from drone

## Flight Modes

- **Manual**: Full pilot control
- **Sport**: High-performance mode with increased agility
- **Cinematic**: Smooth, slow movements for filming
- **Auto**: GPS-assisted stabilized flight
- **ATTI**: Attitude mode without GPS positioning
- **Follow Me**: Autonomous tracking of subject

## Battery/Power

- **LiPo**: Lithium Polymer battery type
- **mAh**: Milliamp hours - battery capacity
- **Cell Count**: Number of battery cells (3S, 4S, etc.)
- **Low Voltage**: Battery protection threshold
- **Flight Time**: Duration drone can remain airborne

## Safety Systems

- **Failsafe**: Automatic response to signal loss
- **Emergency Stop**: Immediate motor shutdown
- **Auto-Land**: Automatic landing sequence
- **Collision Avoidance**: Automated obstacle detection and avoidance
- **Redundancy**: Backup systems for critical components

---

# TypeScript Type Definitions

## Core Interfaces

```typescript
interface DroneStatus {
  id: string;
  name: string;
  model: string;
  firmware: string;
  isConnected: boolean;
  lastUpdated: Date;
}

interface FlightData {
  speed: number; // km/h
  altitude: number; // meters
  distance: number; // meters from home
  coordinates: {
    latitude: number;
    longitude: number;
  };
  heading: number; // degrees (0-360)
  homePoint: {
    latitude: number;
    longitude: number;
  };
}

interface BatteryInfo {
  percentage: number; // 0-100
  voltage: number; // volts
  temperature: number; // celsius
  cycleCount: number;
  estimatedFlightTime: number; // minutes
}

interface TelemetryData {
  speed: number;
  ldis: number; // mm
  height: number; // meters
  iso: number;
  flightTime: string; // formatted time
  shutter: number;
  frameLines: string[];
  temperature: number; // celsius
  signalStrength: number; // percentage
}

interface DroneControls {
  isArmed: boolean;
  flightMode: "manual" | "sport" | "cinematic" | "auto";
  gpsMode: boolean;
  obstacleAvoidance: boolean;
  returnToHomeHeight: number; // meters
}

interface CameraSettings {
  resolution: string; // '4K', '1080p', etc.
  fps: number;
  iso: number;
  shutter: number;
  isRecording: boolean;
  recordingTime: string;
  storageRemaining: number; // GB
  mode: "photo" | "video";
}

interface JoystickInput {
  throttle: number; // -100 to 100
  yaw: number; // -100 to 100
  pitch: number; // -100 to 100
  roll: number; // -100 to 100
}

interface MapSettings {
  viewStyle: "satellite" | "hybrid" | "terrain" | "street";
  zoom: number;
  showFlightPath: boolean;
  showNoFlyZones: boolean;
  mapSize: "small" | "medium" | "large";
}

interface UISettings {
  showGrid: boolean;
  showMap: boolean;
  showJoystick: boolean;
  showTelemetry: boolean;
  theme: "dark" | "light";
}
```

## Composite State

```typescript
interface DroneState {
  status: DroneStatus;
  battery: BatteryInfo;
  flight: FlightData;
  camera: CameraSettings;
  telemetry: TelemetryData;
  controls: DroneControls;
  ui: UISettings;
  map: MapSettings;
}
```

## API Types

```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: Date;
}

interface CommandPayload {
  command: string;
  params?: Record<string, any>;
  timestamp: Date;
}
```
