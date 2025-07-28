// types/drone.ts
export interface DroneStatus {
  id: string;
  name: string;
  model: string;
  firmware: string;
  isConnected: boolean;
  lastUpdated: Date;
}

export interface BatteryInfo {
  percentage: number;
  voltage: number;
  temperature: number;
  cycleCount: number;
  estimatedFlightTime: number;
  lastChargedAt: Date;
}

export interface FlightData {
  speed: number; // km/h
  altitude: number; // meters
  distance: number; // meters from home
  flightTime: string; // formatted time
  coordinates: {
    latitude: number;
    longitude: number;
  };
  heading: number; // degrees
  homePoint: {
    latitude: number;
    longitude: number;
  };
}

export interface CameraSettings {
  resolution: string;
  fps: number;
  iso: number;
  shutter: number;
  isRecording: boolean;
  recordingTime: string;
  storageRemaining: number; // GB
  mode: "photo" | "video";
}

export interface TelemetryData {
  speed: number;
  ldis: number; // Light Detection and Ranging Sensor
  height: number;
  iso: number;
  flightTime: string;
  shutter: number;
  frameLines: string[];
  temperature: number;
  signalStrength: number;
}

export interface DroneControls {
  isArmed: boolean;
  flightMode: "manual" | "sport" | "cinematic" | "auto";
  gpsMode: boolean;
  obstacleAvoidance: boolean;
  returnToHomeHeight: number;
}

export interface JoystickInput {
  throttle: number; // -100 to 100
  yaw: number; // -100 to 100
  pitch: number; // -100 to 100
  roll: number; // -100 to 100
}

export interface MapSettings {
  viewStyle: "satellite" | "hybrid" | "terrain" | "street";
  zoom: number;
  showFlightPath: boolean;
  showNoFlyZones: boolean;
  mapSize: "small" | "medium" | "large";
}

export interface UISettings {
  showGrid: boolean;
  showMap: boolean;
  showJoystick: boolean;
  showTelemetry: boolean;
  theme: "dark" | "light";
}

export interface LiveStreamData {
  url: string;
  quality: "1080p" | "4K" | "720p";
  latency: number; // ms
  bitrate: number; // kbps
  isStreaming: boolean;
}

export interface DroneState {
  status: DroneStatus;
  battery: BatteryInfo;
  flight: FlightData;
  camera: CameraSettings;
  telemetry: TelemetryData;
  controls: DroneControls;
  liveStream: LiveStreamData;
  ui: UISettings;
  map: MapSettings;
}
