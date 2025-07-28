"use client";
import React from "react";
import { Grid3X3, Map, Gamepad2, Camera, Video } from "lucide-react";
import { UISettings, CameraSettings } from "../../types/drone";

interface TopControlsBarProps {
  uiSettings: UISettings;
  camera: CameraSettings;
  onUISettingsChange: (settings: Partial<UISettings>) => void;
  onCameraChange: (camera: Partial<CameraSettings>) => void;
  className?: string;
}

export default function TopControlsBar({
  uiSettings,
  camera,
  onUISettingsChange,
  onCameraChange,
  className = "",
}: TopControlsBarProps) {
  return (
    <div
      className={`bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-3 flex items-center justify-between ${className}`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-300">HDR</span>
        <span className="text-sm text-gray-300">
          {camera.resolution} • {camera.fps}FPS
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">LEVEL</span>
          <div className="w-20 h-1 bg-gray-600 rounded-full">
            <div className="w-1/2 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Toggle Controls */}
        <button
          onClick={() => onUISettingsChange({ showGrid: !uiSettings.showGrid })}
          className={`p-2 rounded transition-colors duration-200 ${
            uiSettings.showGrid
              ? "bg-orange-600 hover:bg-orange-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title="Toggle Grid Overlay"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onUISettingsChange({ showMap: !uiSettings.showMap })}
          className={`p-2 rounded transition-colors duration-200 ${
            uiSettings.showMap
              ? "bg-orange-600 hover:bg-orange-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title="Toggle Map"
        >
          <Map className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            onUISettingsChange({ showJoystick: !uiSettings.showJoystick })
          }
          className={`p-2 rounded transition-colors duration-200 ${
            uiSettings.showJoystick
              ? "bg-orange-600 hover:bg-orange-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title="Toggle Joystick"
        >
          <Gamepad2 className="w-4 h-4" />
        </button>

        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors">
          XT
        </button>
        <div className="flex space-x-1">
          <button className="w-3 h-3 bg-red-500 rounded-sm hover:bg-red-400 transition-colors"></button>
          <button className="w-3 h-3 bg-green-500 rounded-sm hover:bg-green-400 transition-colors"></button>
          <button className="w-3 h-3 bg-blue-500 rounded-sm hover:bg-blue-400 transition-colors"></button>
          <button className="w-3 h-3 bg-yellow-500 rounded-sm hover:bg-yellow-400 transition-colors"></button>
        </div>
      </div>
    </div>
  );
}
