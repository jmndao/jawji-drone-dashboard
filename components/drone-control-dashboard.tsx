"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Settings,
  Camera,
  Navigation,
  Sun,
  Bell,
  Flag,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Download,
  Maximize,
} from "lucide-react"
import Image from "next/image"

type Telemetry = {
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  battery: number;
  heading: number;
  satellites: number;
  signal_strength: number;
};

function generateMockTelemetry(): Telemetry {
  return {
    latitude: +(24 + Math.random()).toFixed(6),
    longitude: +(46 + Math.random()).toFixed(6),
    altitude: +(Math.random() * 120).toFixed(2),
    speed: +(Math.random() * 20).toFixed(2),
    battery: +(20 + Math.random() * 80).toFixed(1),
    heading: +(Math.random() * 360).toFixed(1),
    satellites: Math.floor(8 + Math.random() * 12),
    signal_strength: +(50 + Math.random() * 50).toFixed(1),
  };
}

export default function DroneControlDashboard() {
  const [isRecording, setIsRecording] = useState(true)
  const [recordingTime, setRecordingTime] = useState("02:09")
  const [batteryLevel, setBatteryLevel] = useState(75)
  const [altitudeLimit, setAltitudeLimit] = useState(270)
  const [telemetry, setTelemetry] = useState<Telemetry>(generateMockTelemetry())

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(generateMockTelemetry())
    }, 1000) // Update every second
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background aerial image */}
      <div className="absolute inset-0 opacity-30">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Aerial background" fill className="object-cover" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar */}
        <div className="w-20 bg-black/80 backdrop-blur-sm flex flex-col items-center py-6 space-y-6">
          {/* DJI Logo */}
          <div className="text-white font-bold text-xl mb-4">dji</div>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Home className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Navigation className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Camera className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Sun className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Flag className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Main Video Feed */}
          <div className="flex-1 relative">
            <Card className="h-full bg-black/60 backdrop-blur-sm border-gray-700 rounded-none">
              <div className="relative h-full">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Drone aerial view of residential area"
                  fill
                  className="object-cover rounded-lg"
                />

                {/* Video Controls Overlay */}
                <div className="absolute top-4 left-4 flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-gray-800/80 text-white">
                    HDR
                  </Badge>
                  <div className="text-white text-sm">4K • 19.67FPS</div>
                </div>

                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="bg-black/60 px-2 py-1 rounded text-white text-sm">{recordingTime}</div>
                </div>

                {/* Flight Path Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white rounded-full bg-white/20" />
                  <div className="absolute w-32 h-0.5 bg-white/60 rotate-45" />
                </div>

                {/* Left Control Panel */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
                  <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg">
                    <div className="text-xs text-gray-300 mb-2">LEVEL</div>
                    <div className="w-24 h-1 bg-gray-600 rounded">
                      <div className="w-16 h-1 bg-white rounded" />
                    </div>
                  </div>

                  <Badge variant="secondary" className="bg-gray-800/80 text-white">
                    KT
                  </Badge>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-xs">R</div>
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-xs">G</div>
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs">B</div>
                    <div className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center text-xs">Y</div>
                  </div>

                  <div className="bg-black/60 backdrop-blur-sm p-2 rounded">
                    <div className="text-xs text-gray-300">H2.65</div>
                  </div>

                  {/* Histogram */}
                  <div className="bg-black/60 backdrop-blur-sm p-2 rounded w-20 h-16">
                    <div className="flex items-end h-full space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white/60 w-1" style={{ height: `${Math.random() * 100}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom Control Panel */}
          <div className="h-64 bg-black/80 backdrop-blur-sm p-4">
            <div className="flex h-full space-x-4">
              {/* Video/Photo Toggle */}
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <Button variant="default" size="sm" className="bg-gray-700 hover:bg-gray-600">
                    📹 Video
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    📷 Photo
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">1</div>
                    <div className="w-16 h-2 bg-gray-600 rounded mt-1">
                      <div className="w-8 h-2 bg-white rounded" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">2</div>
                    <div className="w-16 h-2 bg-gray-600 rounded mt-1">
                      <div className="w-4 h-2 bg-white rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <Card className="w-48 bg-gray-900 border-gray-700">
                <div className="h-full relative">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Map view"
                    fill
                    className="object-cover rounded opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                </div>
              </Card>

              {/* Flight Data */}
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-400">SPEED</div>
                    <div className="text-lg font-bold">{telemetry.speed} m/s</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">HEIGHT</div>
                    <div className="text-lg font-bold">{telemetry.altitude} m</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">FLIGHT TIME</div>
                    <div className="text-lg font-bold">05:43</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-400">LENS</div>
                    <div className="text-lg font-bold">25 mm</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">ISO</div>
                    <div className="text-lg font-bold">600</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">SHUTTER</div>
                    <div className="text-lg font-bold">180.0</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-400">FRAME LINE</div>
                    <div className="text-sm">1920 : 1080</div>
                    <div className="text-sm">1280 : 720</div>
                    <div className="text-sm">854 : 480</div>
                    <div className="text-sm">640 : 360</div>
                  </div>
                </div>
              </div>

              {/* Center Control Dial */}
              <div className="flex items-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-2 border-gray-600 rounded-full" />
                  <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="text-xs text-center">
                      <div>Disp/menu</div>
                      <div className="mt-1">Mode</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* AWB/DISP Controls */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm" className="bg-gray-700">
                    AWB
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-gray-700">
                    DISP
                  </Button>
                </div>
                <div className="text-xs text-gray-400">83°</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-black/80 backdrop-blur-sm p-6 space-y-6">
          {/* Drone Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
              <div className="w-8 h-1 bg-white rounded" />
            </div>
            <div>
              <div className="font-bold">DJI Mavic Pro</div>
              <div className="text-xs text-gray-400">FHD high-framerate Live Feed</div>
            </div>
          </div>

          {/* Battery Status */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Battery Status</span>
              <span className="text-sm font-bold">{telemetry.battery}%</span>
            </div>
            <div className="text-xs text-gray-400 mb-2">12 min ago</div>
            <div className="w-full h-2 bg-gray-700 rounded">
              <div className="h-2 bg-green-500 rounded" style={{ width: `${telemetry.battery}%` }} />
            </div>
          </div>

          {/* Altitude Limit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Altitude limited</span>
              <span className="text-sm font-bold">{altitudeLimit} M</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded">
              <div className="w-3/4 h-2 bg-yellow-500 rounded" />
            </div>
          </div>

          {/* Control Slider */}
          <div className="flex items-center space-x-4">
            <span className="text-sm">+0</span>
            <Slider value={[50]} max={100} step={1} className="flex-1" />
            <span className="text-sm">0.3</span>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" className="bg-gray-800 hover:bg-gray-700">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-gray-800 hover:bg-gray-700">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-gray-800 hover:bg-gray-700">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          {/* Compass */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border border-gray-600 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xs text-center">
                  <div className="mb-2">N</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div>330</div>
                    <div>0</div>
                    <div>30</div>
                    <div>300</div>
                    <div>•</div>
                    <div>60</div>
                    <div>270</div>
                    <div>S</div>
                    <div>90</div>
                  </div>
                  <div className="mt-2">
                    <div>W ← → E</div>
                    <div className="text-xs text-gray-400 mt-2">50°26'3"N 30°28'50"E</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
