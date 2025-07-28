"use client";
import React, { useState, useRef, useEffect } from "react";
import { JoystickInput } from "../../types/drone";

interface VirtualJoystickProps {
  onJoystickMove: (input: Partial<JoystickInput>) => void;
  disabled?: boolean;
  type: "throttle-yaw" | "pitch-roll";
  className?: string;
}

export default function VirtualJoystick({
  onJoystickMove,
  disabled = false,
  type,
  className = "",
}: VirtualJoystickProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled || !joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;

    let x = e.clientX - rect.left - centerX;
    let y = e.clientY - rect.top - centerY;

    const distance = Math.sqrt(x * x + y * y);
    if (distance > maxRadius) {
      x = (x / distance) * maxRadius;
      y = (y / distance) * maxRadius;
    }

    setPosition({ x, y });

    // Convert to percentage values (-100 to 100)
    const xPercent = (x / maxRadius) * 100;
    const yPercent = -(y / maxRadius) * 100; // Invert Y axis

    if (type === "throttle-yaw") {
      onJoystickMove({
        throttle: yPercent,
        yaw: xPercent,
      });
    } else {
      onJoystickMove({
        pitch: yPercent,
        roll: xPercent,
      });
    }
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });

    // Reset values when released
    if (type === "throttle-yaw") {
      onJoystickMove({ throttle: 0, yaw: 0 });
    } else {
      onJoystickMove({ pitch: 0, roll: 0 });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, disabled]);

  const getLabel = () => {
    return type === "throttle-yaw" ? "T/Y" : "P/R";
  };

  const getInstructions = () => {
    if (type === "throttle-yaw") {
      return "Throttle/Yaw";
    } else {
      return "Pitch/Roll";
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Joystick Base */}
      <div
        ref={joystickRef}
        className={`relative w-36 h-36 rounded-full border-3 transition-all duration-200 ${
          disabled
            ? "bg-gray-800/40 border-gray-700/50 cursor-not-allowed"
            : isDragging
            ? "bg-gray-900/90 border-orange-500/80 shadow-lg shadow-orange-500/20"
            : "bg-gray-900/70 border-gray-600/70 hover:border-orange-400/60"
        } backdrop-blur-sm`}
        style={{
          background: disabled
            ? "radial-gradient(circle, rgba(55, 65, 81, 0.4) 0%, rgba(31, 41, 55, 0.4) 100%)"
            : "radial-gradient(circle, rgba(17, 24, 39, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      >
        {/* Concentric circles for visual depth */}
        <div className="absolute inset-4 rounded-full border border-gray-600/50"></div>
        <div className="absolute inset-8 rounded-full border border-gray-700/30"></div>

        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-0.5 bg-gray-500/60 rounded-full"></div>
          <div className="w-0.5 h-4 bg-gray-500/60 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Directional indicators */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-medium">
          {type === "throttle-yaw" ? "T+" : "P+"}
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-medium">
          {type === "throttle-yaw" ? "T-" : "P-"}
        </div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-medium">
          {type === "throttle-yaw" ? "Y-" : "R-"}
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-medium">
          {type === "throttle-yaw" ? "Y+" : "R+"}
        </div>

        {/* Joystick Knob */}
        <div
          ref={knobRef}
          className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-150 ${
            disabled
              ? "bg-gray-600/50 border-gray-500/50"
              : isDragging
              ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/50 scale-110"
              : "bg-gray-300 border-gray-200 hover:bg-orange-400 hover:border-orange-300 hover:scale-105"
          } border-2`}
          style={{
            transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Knob highlight */}
          <div
            className={`absolute top-1 left-1 w-2 h-2 rounded-full ${
              disabled ? "bg-gray-400/30" : "bg-white/40"
            }`}
          ></div>
        </div>

        {/* Active state glow */}
        {isDragging && !disabled && (
          <div className="absolute inset-0 rounded-full border border-orange-400/30 animate-pulse"></div>
        )}
      </div>

      {/* Label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div
          className={`text-sm font-semibold ${
            disabled ? "text-gray-500" : "text-gray-300"
          }`}
        >
          {getLabel()}
        </div>
      </div>

      {/* Disabled overlay */}
      {disabled && (
        <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
          <div className="text-gray-500 text-xs font-medium bg-gray-800/80 px-2 py-1 rounded">
            DISABLED
          </div>
        </div>
      )}
    </div>
  );
}
