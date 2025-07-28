"use client";
import React, { useState, useCallback } from "react";

// Import components
import LeftSidebar from "../navigation/LeftSidebar";
import TopControlsBar from "../controls/TopControlsBar";
import BottomControlsBar from "../controls/BottomControlsBar";
import LiveVideoFeed from "../video/LiveVideoFeed";
import TelemetrySidebar from "../telemetry/TelemetrySidebar";

// Import types
import {
  DroneState,
  JoystickInput,
  MapSettings,
  UISettings,
  DroneControls,
  CameraSettings,
} from "../../types/drone";

interface MainDashboardProps {
  initialDroneState: DroneState;
}

export default function MainDashboard({
  initialDroneState,
}: MainDashboardProps) {
  const [droneState, setDroneState] = useState<DroneState>(initialDroneState);

  // UI State handlers
  const updateUISettings = useCallback((settings: Partial<UISettings>) => {
    setDroneState((prev) => ({
      ...prev,
      ui: { ...prev.ui, ...settings },
    }));
  }, []);

  const updateMapSettings = useCallback((settings: Partial<MapSettings>) => {
    setDroneState((prev) => ({
      ...prev,
      map: { ...prev.map, ...settings },
    }));
  }, []);

  const updateControls = useCallback((controls: Partial<DroneControls>) => {
    setDroneState((prev) => ({
      ...prev,
      controls: { ...prev.controls, ...controls },
    }));
  }, []);

  const updateCamera = useCallback((camera: Partial<CameraSettings>) => {
    setDroneState((prev) => ({
      ...prev,
      camera: { ...prev.camera, ...camera },
    }));
  }, []);

  // Joystick handlers
  const handleJoystickMove = useCallback((input: Partial<JoystickInput>) => {
    // Here you would send the input to your drone control system
    console.log("Joystick input:", input);
  }, []);

  // Control handlers
  const handleEmergencyStop = useCallback(() => {
    console.log("Emergency stop triggered");
    // Implement emergency stop logic
    updateControls({ isArmed: false });
  }, [updateControls]);

  const handleTakeoff = useCallback(() => {
    console.log("Takeoff initiated");
    updateControls({ isArmed: true });
  }, [updateControls]);

  const handleReturnToHome = useCallback(() => {
    console.log("Return to home initiated");
    // Implement RTH logic
  }, []);

  const handleLanding = useCallback(() => {
    console.log("Landing initiated");
    updateControls({ isArmed: false });
  }, [updateControls]);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Main Interface */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Top Controls Bar */}
          <TopControlsBar
            uiSettings={droneState.ui}
            camera={droneState.camera}
            onUISettingsChange={updateUISettings}
            onCameraChange={updateCamera}
          />

          {/* Live Video Feed with embedded controls */}
          <div className="flex-1 min-h-0">
            <LiveVideoFeed
              camera={droneState.camera}
              flight={droneState.flight}
              mapSettings={droneState.map}
              uiSettings={droneState.ui}
              controls={droneState.controls}
              telemetry={droneState.telemetry}
              onCameraChange={updateCamera}
              onMapSettingsChange={updateMapSettings}
              onJoystickMove={handleJoystickMove}
              onControlChange={updateControls}
              onEmergencyStop={handleEmergencyStop}
              onTakeoff={handleTakeoff}
              onReturnToHome={handleReturnToHome}
              onLanding={handleLanding}
            />
          </div>

          {/* Bottom Controls */}
          <BottomControlsBar
            camera={droneState.camera}
            flight={droneState.flight}
            onCameraChange={updateCamera}
          />
        </div>

        {/* Right Sidebar - Telemetry */}
        <TelemetrySidebar
          status={droneState.status}
          battery={droneState.battery}
          telemetry={droneState.telemetry}
          flight={droneState.flight}
        />
      </div>
    </div>
  );
}
