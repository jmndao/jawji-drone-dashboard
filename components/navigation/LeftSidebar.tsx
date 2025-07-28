"use client";
import React from "react";
import {
  Home,
  Camera,
  Settings,
  Target,
  Navigation,
  Battery,
} from "lucide-react";

interface LeftSidebarProps {
  className?: string;
}

export default function LeftSidebar({ className = "" }: LeftSidebarProps) {
  const navigationItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Camera, label: "Camera", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: Target, label: "Target", active: false },
    { icon: Navigation, label: "Navigation", active: false },
    { icon: Battery, label: "Battery", active: false },
  ];

  return (
    <div
      className={`w-20 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center py-4 space-y-6 border-r border-gray-700/50 ${className}`}
    >
      {/* JAWJI Logo */}
      <div className="text-white font-bold text-lg">
        <span className="bg-white text-black px-2 py-1 rounded text-sm">
          JAWJI
        </span>
      </div>

      {/* Navigation Icons */}
      {navigationItems.map((item, index) => (
        <button
          key={index}
          className={`p-3 rounded-lg transition-colors duration-200 ${
            item.active
              ? "bg-orange-600/20 text-orange-400"
              : "hover:bg-gray-700/50 text-gray-400 hover:text-white"
          }`}
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}
