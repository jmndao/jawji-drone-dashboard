"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Video,
  Crosshair,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// Import components
import VirtualJoystick from "../controls/VirtualJoystick";
import DraggableMap from "../map/DraggableMap";

// Import types
import {
  CameraSettings,
  FlightData,
  MapSettings,
  UISettings,
  JoystickInput,
  DroneControls,
  TelemetryData,
} from "../../types/drone";

interface LiveVideoFeedProps {
  camera: CameraSettings;
  flight: FlightData;
  mapSettings: MapSettings;
  uiSettings: UISettings;
  controls: DroneControls;
  telemetry: TelemetryData;
  onCameraChange: (camera: Partial<CameraSettings>) => void;
  onMapSettingsChange: (settings: Partial<MapSettings>) => void;
  onJoystickMove: (input: Partial<JoystickInput>) => void;
  onControlChange: (controls: Partial<DroneControls>) => void;
  onEmergencyStop: () => void;
  onTakeoff: () => void;
  onReturnToHome: () => void;
  onLanding: () => void;
}

interface FlightControlPanelProps {
  controls: DroneControls;
  onControlChange: (controls: Partial<DroneControls>) => void;
  onEmergencyStop: () => void;
  onTakeoff: () => void;
  onReturnToHome: () => void;
  onLanding: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

// Flight Control Panel Component
const FlightControlPanel: React.FC<FlightControlPanelProps> = ({
  controls,
  onControlChange,
  onEmergencyStop,
  onTakeoff,
  onReturnToHome,
  onLanding,
  isExpanded,
  onToggle,
}) => {
  const flightModes = [
    { value: "manual", label: "Manual" },
    { value: "sport", label: "Sport" },
    { value: "cinematic", label: "Cinematic" },
    { value: "auto", label: "Auto" },
  ] as const;

  return (
    <>
      {/* Toggle Button - Top Position */}
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 z-30 bg-black/70 backdrop-blur-md rounded-lg border border-gray-600/30 p-2 hover:bg-black/80 transition-all duration-300 group"
      >
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-white" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-white" />
          )}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300 font-medium">Controls</span>
            <div
              className={`w-2 h-2 rounded-full ${
                controls.isArmed ? "bg-orange-500" : "bg-gray-500"
              } transition-colors duration-300`}
            ></div>
          </div>
        </div>
      </button>

      {/* Sliding Panel */}
      <div
        className="absolute left-0 top-0 bg-black/85 backdrop-blur-lg border-r border-gray-600/30 shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto"
        style={{
          width: "300px",
          height: "auto",
          maxHeight: "100%",
          transform: `translateX(${isExpanded ? "0px" : "-100%"})`,
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="p-6 pt-16 pb-6">
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Flight Controls
            </h3>
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  controls.isArmed ? "bg-orange-500" : "bg-gray-500"
                } transition-colors duration-300`}
              ></div>
              <span className="text-xs text-gray-300">
                {controls.isArmed ? "ARMED" : "DISARMED"}
              </span>
            </div>
          </div>

          {/* Primary Controls */}
          <div className="space-y-3 mb-6">
            <button
              onClick={onTakeoff}
              disabled={controls.isArmed}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-all duration-200 border border-gray-600 disabled:border-gray-700"
            >
              <Play className="w-4 h-4" />
              <span>Takeoff</span>
            </button>

            <button
              onClick={onLanding}
              disabled={!controls.isArmed}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-all duration-200 border border-gray-600 disabled:border-gray-700"
            >
              <Pause className="w-4 h-4" />
              <span>Land</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onReturnToHome}
                disabled={!controls.isArmed}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-medium text-white text-sm transition-all duration-200 border border-gray-600 disabled:border-gray-700"
              >
                <span>RTH</span>
              </button>

              <button
                onClick={onEmergencyStop}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-700 hover:bg-red-600 rounded-lg font-medium text-white text-sm transition-all duration-200 border border-red-600"
              >
                <span>STOP</span>
              </button>
            </div>
          </div>

          {/* Flight Mode Selection */}
          <div className="mb-6">
            <label className="text-sm text-gray-300 block mb-3 font-medium">
              Flight Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {flightModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onControlChange({ flightMode: mode.value })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    controls.flightMode === mode.value
                      ? "bg-gray-600 text-white border-gray-500"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* System Toggles */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">
                GPS Mode
              </span>
              <button
                onClick={() => onControlChange({ gpsMode: !controls.gpsMode })}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                  controls.gpsMode ? "bg-gray-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                    controls.gpsMode ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">
                Obstacle Avoidance
              </span>
              <button
                onClick={() =>
                  onControlChange({
                    obstacleAvoidance: !controls.obstacleAvoidance,
                  })
                }
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                  controls.obstacleAvoidance ? "bg-gray-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                    controls.obstacleAvoidance
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function LiveVideoFeed({
  camera,
  flight,
  mapSettings,
  uiSettings,
  controls,
  telemetry,
  onCameraChange,
  onMapSettingsChange,
  onJoystickMove,
  onControlChange,
  onEmergencyStop,
  onTakeoff,
  onReturnToHome,
  onLanding,
}: LiveVideoFeedProps) {
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);
  const [containerBounds, setContainerBounds] = useState<DOMRect | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Update container bounds
  useEffect(() => {
    const updateBounds = () => {
      if (videoContainerRef.current) {
        setContainerBounds(videoContainerRef.current.getBoundingClientRect());
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const toggleRecording = () => {
    onCameraChange({ isRecording: !camera.isRecording });
  };

  const handleControlChange = (newControls: Partial<DroneControls>) => {
    onControlChange(newControls);
  };

  const handleEmergencyStopClick = () => {
    onEmergencyStop();
  };

  const handleTakeoffClick = () => {
    onTakeoff();
  };

  const handleReturnToHomeClick = () => {
    onReturnToHome();
  };

  const handleLandingClick = () => {
    onLanding();
  };

  return (
    <div
      ref={videoContainerRef}
      className="w-full h-full relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
    >
      {/* Video Content */}
      <div className="absolute inset-0 bg-gray-800">
        {/* Demo Video Stream */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          <source
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            type="video/mp4"
          />
          {/* Fallback content */}
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-16 h-16 text-gray-400" />
              </div>
              <span className="text-gray-400 text-xl">Live Feed</span>
              <div className="mt-2 text-sm text-gray-500">
                {camera.resolution} • {camera.fps} FPS
              </div>
            </div>
          </div>
        </video>
      </div>

      {/* Grid Overlay */}
      {uiSettings.showGrid && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full grid grid-cols-3 grid-rows-3 border border-white/20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
      )}

      {/* Crosshair Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="w-8 h-8 text-white/60" />
      </div>

      {/* Recording Indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/60 rounded-lg px-3 py-2">
        <div
          className={`w-3 h-3 rounded-full ${
            camera.isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500"
          }`}
        ></div>
        <span className="text-sm font-mono">{camera.recordingTime}</span>
        <button onClick={toggleRecording}>
          {camera.isRecording ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Flight Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-3">
        <div className="text-xs text-gray-300 mb-1">HQ RX</div>
        <div className="w-20 h-8 bg-gray-700 rounded flex items-end justify-around p-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-white rounded-t"
              style={{ height: `${Math.random() * 100}%` }}
            ></div>
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Signal: {telemetry.signalStrength}%
        </div>
      </div>

      {/* Flight Control Panel */}
      <FlightControlPanel
        controls={controls}
        onControlChange={handleControlChange}
        onEmergencyStop={handleEmergencyStopClick}
        onTakeoff={handleTakeoffClick}
        onReturnToHome={handleReturnToHomeClick}
        onLanding={handleLandingClick}
        isExpanded={isControlsExpanded}
        onToggle={() => setIsControlsExpanded(!isControlsExpanded)}
      />

      {/* Draggable Map */}
      {uiSettings.showMap && containerBounds && (
        <DraggableMap
          flightData={flight}
          mapSettings={mapSettings}
          onMapSettingsChange={onMapSettingsChange}
          onPositionChange={() => {}}
          containerBounds={containerBounds}
        />
      )}

      {/* Virtual Joysticks */}
      {uiSettings.showJoystick && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-12">
          <VirtualJoystick
            type="throttle-yaw"
            onJoystickMove={onJoystickMove}
            disabled={false} // Not disabled, just toggled off by default
          />
          <VirtualJoystick
            type="pitch-roll"
            onJoystickMove={onJoystickMove}
            disabled={false} // Not disabled, just toggled off by default
          />
        </div>
      )}
    </div>
  );
}
