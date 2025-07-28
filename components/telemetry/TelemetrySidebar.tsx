"use client";
import React from "react";
import Image from "next/image";
import {
  DroneStatus,
  BatteryInfo,
  TelemetryData,
  FlightData,
} from "../../types/drone";

interface TelemetrySidebarProps {
  status: DroneStatus;
  battery: BatteryInfo;
  telemetry: TelemetryData;
  flight: FlightData;
  className?: string;
}

export default function TelemetrySidebar({
  status,
  battery,
  telemetry,
  flight,
  className = "",
}: TelemetrySidebarProps) {
  return (
    <div
      className={`w-80 bg-gray-900/50 backdrop-blur-sm border-l border-gray-700/50 flex flex-col overflow-hidden ${className}`}
    >
      {/* Drone Status Header */}
      <div className="p-4 border-b border-gray-700/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">{status.name}</span>
          <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
            <Image src="/jawu-drone1.png" alt="Drone" width={32} height={32} />
          </div>
        </div>
        <div className="text-xs text-gray-400">
          {status.model} • {status.firmware}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">Battery</span>
          <span className="text-sm font-semibold">{battery.percentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${
              battery.percentage > 50
                ? "bg-green-500"
                : battery.percentage > 20
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${battery.percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Est: {battery.estimatedFlightTime}min • Alt: {flight.altitude}M
        </div>
      </div>

      {/* Flight Data */}
      <div className="p-4 border-b border-gray-700/50 flex-shrink-0">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-400">SPEED</div>
            <div className="text-base font-semibold">
              {telemetry.speed} km/h
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">LDIS</div>
            <div className="text-base font-semibold">{telemetry.ldis} mm</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">HEIGHT</div>
            <div className="text-base font-semibold">{telemetry.height} m</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">ISO</div>
            <div className="text-base font-semibold">{telemetry.iso}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">TIME</div>
            <div className="text-base font-semibold">
              {telemetry.flightTime}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">SHUT</div>
            <div className="text-base font-semibold">{telemetry.shutter}</div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xs text-gray-400 mb-1">FRAME LINES</div>
          <div className="text-xs text-gray-300 space-y-0.5">
            {telemetry.frameLines.slice(0, 2).map((frameLine, index) => (
              <div key={index}>{frameLine}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Compass & Status */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Compact Compass */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border border-gray-500 bg-gray-800/50">
            {/* Minimal markings */}
            {[0, 90, 180, 270].map((angle, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-2 bg-gray-400"
                style={{
                  left: "50%",
                  top: "2px",
                  transformOrigin: "50% 54px",
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
              />
            ))}

            <div className="absolute inset-2 rounded-full bg-gray-700/30">
              {/* Cardinals */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                N
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                S
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                E
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                W
              </div>

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>

              {/* Needle */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                style={{
                  transform: `translate(-50%, -50%) rotate(${flight.heading}deg)`,
                }}
              >
                <div
                  className="absolute w-0.5 h-8 bg-red-500 rounded-full"
                  style={{ top: "-32px", left: "-1px" }}
                ></div>
                <div
                  className="absolute w-0.5 h-6 bg-gray-300 rounded-full"
                  style={{ top: "2px", left: "-1px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Heading & Temp */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-4 px-4 py-2 bg-gray-800/50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-400">
                {Math.round(flight.heading)}°
              </div>
              <div className="text-xs text-gray-400">HDG</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {telemetry.temperature}°
              </div>
              <div className="text-xs text-gray-400">TEMP</div>
            </div>
          </div>
        </div>

        {/* Compact Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-800/30 rounded">
            <span className="text-xs text-gray-400">Signal</span>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-0.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-2 rounded-full ${
                      i < Math.floor(telemetry.signalStrength / 25)
                        ? telemetry.signalStrength > 70
                          ? "bg-green-400"
                          : telemetry.signalStrength > 30
                          ? "bg-yellow-400"
                          : "bg-red-400"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-300">
                {telemetry.signalStrength}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2 bg-gray-800/30 rounded">
            <span className="text-xs text-gray-400">Status</span>
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  status.isConnected ? "bg-green-400" : "bg-red-400"
                }`}
              ></div>
              <span className="text-xs font-semibold text-gray-300">
                {status.isConnected ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="px-3 py-2 bg-gray-800/20 rounded">
            <div className="text-xs text-gray-400 mb-1">System</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">GPS</span>
                <span className="text-green-400">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">IMU</span>
                <span className="text-green-400">OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
