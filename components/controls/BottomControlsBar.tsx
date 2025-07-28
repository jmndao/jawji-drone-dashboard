"use client";
import React from "react";
import { Camera, Video } from "lucide-react";
import { CameraSettings, FlightData } from "../../types/drone";

interface BottomControlsBarProps {
  camera: CameraSettings;
  flight: FlightData;
  onCameraChange: (camera: Partial<CameraSettings>) => void;
  className?: string;
}

export default function BottomControlsBar({
  camera,
  flight,
  onCameraChange,
  className = "",
}: Readonly<BottomControlsBarProps>) {
  return (
    <div
      className={`bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 px-6 py-3 flex items-center justify-between ${className}`}
    >
      <div className="flex items-center space-x-4">
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-200 ${
            camera.mode === "video" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => onCameraChange({ mode: "video" })}
        >
          <Video className="w-4 h-4" />
          <span className="text-sm">Video</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-200 ${
            camera.mode === "photo" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => onCameraChange({ mode: "photo" })}
        >
          <Camera className="w-4 h-4" />
          <span className="text-sm">Photo</span>
        </button>

        <div className="flex space-x-2">
          <div className="px-2 py-1 bg-gray-700 rounded text-xs">1</div>
          <div className="px-2 py-1 bg-gray-600 rounded text-xs">2</div>
        </div>

        <button className="px-3 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 transition-colors">
          AWS
        </button>
        <button className="px-3 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 transition-colors">
          DNP
        </button>
      </div>

      <div className="text-right">
        <div className="text-xs text-gray-400">
          {flight.coordinates.latitude.toFixed(6)}°N{" "}
          {flight.coordinates.longitude.toFixed(6)}°E
        </div>
        <div className="text-xs text-gray-500">
          Alt: {flight.altitude}m • Dist: {flight.distance}m
        </div>
      </div>
    </div>
  );
}
