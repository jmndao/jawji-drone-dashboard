"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Navigation,
  Battery,
  Gauge,
  Clock,
  MapPin,
  CloudRain,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Wifi,
  Radio,
  Home,
  Square,
  RotateCcw,
} from "lucide-react"
import Image from "next/image"

export default function DroneController() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(129) // 02:09
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [altitudeLimit, setAltitudeLimit] = useState([110])
  const [flightMode, setFlightMode] = useState("STABILIZE")

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
      {/* Header - Fixed height */}
      <div className="bg-slate-800 px-6 py-3 flex items-center justify-between border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">J</span>
            </div>
            <span className="text-lg font-bold">Jawji</span>
          </div>
          <nav className="flex space-x-1">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs px-3 py-1">
              Controller
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-3 py-1">
              Overview
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-3 py-1">
              Routes
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-3 py-1">
              All drones
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-3 py-1">
              Map view
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>243.4km</span>
          </div>
          <div className="flex items-center space-x-1">
            <CloudRain className="h-3 w-3" />
            <span>Clear, 24°C</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="h-3 w-3 text-green-400" />
            <span className="text-green-400">Online • 12 SAT</span>
          </div>
          <span className="font-mono">11:43 AM</span>
        </div>
      </div>

      {/* Main content area - Flexible height */}
      <div className="flex flex-1 min-h-0">
        {/* Left side - Video Feed */}
        <div className="w-1/2 p-4">
          <div className="relative h-full bg-slate-800 rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Drone live feed" fill className="object-cover" />

            {/* Top overlay */}
            <div className="absolute top-3 left-3 right-3 flex justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-600 text-xs">HDR</Badge>
                <span className="text-white bg-black/50 px-2 py-1 rounded text-xs">4K • 30 FPS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 h-8 w-8"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
                <span className="text-white bg-black/50 px-2 py-1 rounded font-mono text-xs">
                  {formatTime(recordingTime)}
                </span>
              </div>
            </div>

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-6 h-6 border-2 border-orange-400 rounded-full bg-orange-400/20" />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-orange-500 px-2 py-1 rounded text-xs font-bold">
                  {flightMode}
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <div className="bg-black/50 px-2 py-1 rounded text-xs font-mono">
                <div>40.7128° N, 74.0060° W</div>
                <div>ALT: 86m • SPD: 17.4 km/h</div>
              </div>
              <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-orange-400 font-bold text-sm">307</div>
                  <div className="text-xs">NW</div>
                </div>
              </div>
            </div>

            {/* Left controls */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 space-y-2">
              <div className="bg-black/50 p-2 rounded">
                <div className="text-xs mb-1">Gimbal</div>
                <div className="w-12 h-1 bg-gray-600 rounded">
                  <div className="w-8 h-1 bg-orange-500 rounded" />
                </div>
              </div>
              <Badge className="bg-black/50 text-xs">AUTO</Badge>
              <div className="grid grid-cols-2 gap-1">
                <div className="w-4 h-4 bg-red-600 rounded text-xs flex items-center justify-center font-bold">R</div>
                <div className="w-4 h-4 bg-green-600 rounded text-xs flex items-center justify-center font-bold">G</div>
                <div className="w-4 h-4 bg-blue-600 rounded text-xs flex items-center justify-center font-bold">B</div>
                <div className="w-4 h-4 bg-yellow-600 rounded text-xs flex items-center justify-center font-bold">
                  Y
                </div>
              </div>
              <div className="bg-black/50 p-1 rounded text-center text-xs font-mono">H2.85</div>
            </div>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="w-1/2 p-4">
          <Card className="bg-slate-800 h-full">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold">Drone Alpha-01</h3>
                  <div className="text-xl font-bold text-orange-400">DHMR-3200</div>
                  <div className="text-xs text-gray-400">DJI Mavic 3 Enterprise</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">Active</span>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {/* Battery */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-orange-400" />
                      <span className="text-sm">Battery</span>
                    </div>
                    <span className="text-orange-400 font-bold text-lg">{batteryLevel}%</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">2663 / 4366 mAh • 27°C</div>
                  <div className="w-full h-2 bg-slate-700 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: `${batteryLevel}%` }} />
                  </div>
                </div>

                {/* Flight Mode */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Flight Mode</span>
                    <span className="text-orange-400 font-bold text-sm">{flightMode}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      onClick={() => setFlightMode("STABILIZE")}
                      className={`${
                        flightMode === "STABILIZE"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-slate-700 hover:bg-slate-600"
                      } text-xs`}
                    >
                      STAB
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setFlightMode("AUTO")}
                      className={`${
                        flightMode === "AUTO" ? "bg-orange-500 hover:bg-orange-600" : "bg-slate-700 hover:bg-slate-600"
                      } text-xs`}
                    >
                      AUTO
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setFlightMode("LOITER")}
                      className={`${
                        flightMode === "LOITER"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-slate-700 hover:bg-slate-600"
                      } text-xs`}
                    >
                      LOITER
                    </Button>
                  </div>
                </div>

                {/* Altitude */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Altitude limit</span>
                    <span className="text-orange-400 font-bold text-sm">{altitudeLimit[0]}m</span>
                  </div>
                  <Slider value={altitudeLimit} onValueChange={setAltitudeLimit} max={300} step={10} />
                </div>

                {/* Emergency Controls */}
                <div>
                  <div className="text-sm font-medium mb-2 text-red-400">Emergency Controls</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button className="bg-red-600 hover:bg-red-700 text-xs">
                      <Home className="h-3 w-3 mr-1" />
                      RTH
                    </Button>
                    <Button variant="outline" className="text-xs bg-transparent border-yellow-600 text-yellow-400">
                      <Square className="h-3 w-3 mr-1" />
                      Land
                    </Button>
                    <Button variant="outline" className="text-xs bg-transparent">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Hover
                    </Button>
                  </div>
                </div>

                {/* Camera Controls */}
                <div>
                  <div className="text-sm font-medium mb-2">Camera Controls</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      ISO
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      HDR
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      DVR
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Panel - Map, Telemetry, and Controls */}
      <div className="bg-slate-800 border-t border-slate-700 p-4 flex-shrink-0 h-48">
        <div className="flex space-x-4 h-full">
          {/* Map */}
          <Card className="bg-slate-700 flex-1">
            <CardContent className="p-3 h-full">
              <div className="text-sm font-medium mb-2">Mission Map</div>
              <div className="relative h-full bg-slate-600 rounded overflow-hidden">
                <Image src="/placeholder.svg?height=150&width=300" alt="Mission Map" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                </div>
                {/* Map overlay info */}
                <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
                  <div>40.7128° N, 74.0060° W</div>
                  <div>Home: 2.1km • Waypoints: 3/5</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Telemetry Card */}
          <Card className="bg-slate-700 w-80">
            <CardContent className="p-3 h-full">
              <div className="text-sm font-medium mb-2">Flight Telemetry</div>
              <div className="grid grid-cols-2 gap-3 h-full">
                <div className="flex items-center space-x-2">
                  <Gauge className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400">Speed</div>
                    <div className="text-sm font-bold">17.4 km/h</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400">Height</div>
                    <div className="text-sm font-bold">86 m</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400">Flight time</div>
                    <div className="text-sm font-bold">12:14</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400">Distance</div>
                    <div className="text-sm font-bold">2.1 km</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400">Signal</div>
                    <div className="text-sm font-bold">-68 dBm</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-xs text-gray-400">Link Quality</div>
                    <div className="text-sm font-bold">98%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Joystick */}
          <Card className="bg-slate-700 w-40">
            <CardContent className="p-3 h-full flex flex-col items-center justify-center">
              <div className="text-sm font-medium mb-3">Flight Control</div>

              {/* Control buttons */}
              <div className="flex space-x-2 mb-3">
                <Button size="sm" variant="secondary" className="text-xs px-2 py-1">
                  AWB
                </Button>
                <Button size="sm" variant="secondary" className="text-xs px-2 py-1">
                  DISP
                </Button>
              </div>

              {/* Joystick */}
              <div className="relative w-20 h-20 border-2 border-gray-600 rounded-full bg-slate-600">
                <div className="absolute inset-2 bg-slate-700 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                </div>

                {/* Directional arrows */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="text-xs text-gray-400 mt-2 text-center">Manual Control</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
