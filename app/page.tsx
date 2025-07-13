"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import { User } from "lucide-react";

// Telemetry type and API endpoint
const TELEMETRY_API = "http://localhost:8000/telemetry";
type Telemetry = {
  battery: number;
  altitude: number;
  max_altitude: number;
  speed: number;
  max_speed: number;
  signal: string;
  signal_bars: number;
  resolution: string;
  frame_rate: number;
  flight_time: number;
  flight_time_remaining: number;
};
function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Dynamically import a client-only map component
const ClientOnlyMap = dynamic(() => import("@/components/ClientOnlyMap"), { ssr: false });

export default function Home() {
  // Saly Aerodrome, Senegal coordinates
  const droneLocation: [number, number] = [14.4522, -17.0089];
  const mapCenter = droneLocation;

  // Telemetry state
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch(TELEMETRY_API);
        const data = await res.json();
        setTelemetry(data);
      } catch (err) {
        setTelemetry(null);
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-orange-50 text-gray-900 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-2 bg-white/90 shadow-lg backdrop-blur-md border-b border-orange-200">
        <div className="flex items-center">
          <Image src="/jawji-logo-removebg-preview.png" alt="Jawji Logo" width={100} height={100} className="" />
        </div>
        <div className="flex items-center gap-4">
          {/* Minimal profile icon only */}
          <span className="font-semibold text-xs flex items-center justify-center"><User className="w-5 h-5 text-gray-400" /></span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full h-[calc(100vh-56px)]">
        {/* Left: Live Stream & Map */}
        <section className="flex-1 flex flex-col gap-3 min-w-[350px] h-full">
          {/* Live Stream */}
          <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center justify-center min-h-[320px] max-h-[45vh] relative border border-orange-100">
            {/* Video area */}
            <div className="relative w-full h-80 bg-gradient-to-br from-gray-100 to-orange-50 rounded-xl flex items-center justify-center overflow-hidden border border-orange-100 shadow-inner">
              {/* Minimal pause/record overlay inside video field */}
              <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
                <div className="flex items-center bg-black/80 rounded-lg px-3 py-1 gap-2 shadow">
                  <button className="flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white focus:outline-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                  </button>
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block animate-pulse"></span>
                  <span className="text-xs text-white font-semibold">02:09</span>
                </div>
              </div>
              {/* Placeholder for video stream */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100">
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-xl font-semibold">Camera Stuff</span>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400"></div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center flex-1 border border-orange-100 min-h-[200px] h-auto">
            <div className="w-full flex items-center justify-between mb-2">
              <div/>  
              <div className="flex items-center gap-2"></div>
            </div>
            <div className="w-full flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-orange-50 flex flex-col items-center justify-center border border-orange-100 shadow-inner">
              {/* Leaflet Map */}
              <div className="w-full h-full min-h-[250px] min-w-[250px]" style={{ height: 300, width: '100%' }}>
                <ClientOnlyMap center={mapCenter} />
              </div>
              <div className="mt-2 text-xs text-gray-700 bg-gray-100 rounded px-3 py-1 shadow border border-orange-100">
                Lat: {droneLocation[0].toFixed(5)}, Lng: {droneLocation[1].toFixed(5)}
              </div>
            </div>
          </div>
        </section>

        {/* Right: Telemetry & Controls */}
        <aside className="w-full lg:w-80 flex flex-col gap-3">
          {/* Telemetry Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center border border-orange-100">
            <div className="flex flex-col items-center mb-2">
              <Image src="/jawu-drone1.png" alt="Jawji Mini Drone" width={150} height={150} className="mb-2" />
            </div>
            <div className="text-center mb-2">
              <span className="block text-lg font-bold text-orange-500">Jawji Mini Drone</span>
        
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 w-full text-xs">
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Battery</span>
                <span className="font-bold text-green-500 text-sm">{telemetry ? `${telemetry.battery}%` : "--"}</span>
                <div className="w-full bg-gray-200 rounded-full h-0.5 mt-1">
                  <div className="bg-green-500 h-0.5 rounded-full" style={{width: telemetry ? `${telemetry.battery}%` : '0%'}}></div>
                </div>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Altitude</span>
                <span className="font-bold text-sm">{telemetry ? `${telemetry.altitude}m` : "--"}</span>
                <span className="text-gray-400 text-xs mt-0.5">Max: {telemetry ? `${telemetry.max_altitude}m` : "--"}</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Speed</span>
                <span className="font-bold text-sm">{telemetry ? `${telemetry.speed} m/s` : "--"}</span>
                <span className="text-gray-400 text-xs mt-0.5">Max: {telemetry ? `${telemetry.max_speed} m/s` : "--"}</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Signal</span>
                <span className={`font-bold text-sm ${telemetry && telemetry.signal === "Strong" ? "text-green-500" : "text-red-500"}`}>{telemetry ? telemetry.signal : "--"}</span>
                <div className="flex gap-0.5 mt-1">
                  {telemetry ? Array.from({length: telemetry.signal_bars}).map((_, i) => (
                    <div key={i} className="w-0.5 h-2 bg-green-500 rounded"></div>
                  )) : null}
                </div>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Resolution</span>
                <span className="font-bold text-sm">{telemetry ? telemetry.resolution : "--"}</span>
                <span className="text-gray-400 text-xs mt-0.5">{telemetry ? `${telemetry.frame_rate} FPS` : "--"}</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Flight Time</span>
                <span className="font-bold text-sm">{telemetry ? formatTime(telemetry.flight_time) : "--"}</span>
                <span className="text-gray-400 text-xs mt-0.5">Remaining: {telemetry ? formatTime(telemetry.flight_time_remaining) : "--"}</span>
              </div>
            </div>
        </div>
  
          {/* Control Pad - Modern Circular Visual with Minimal Action Buttons and Arrows */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-orange-100 mt-2">
            {/* Modern Circular Pad with Arrows */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner" />
              <div className="absolute inset-6 rounded-full bg-gray-200 shadow-inner border border-gray-300" />
              {/* Up Arrow */}
              <button onClick={() => console.log('up')} className="absolute top-2 left-1/2 -translate-x-1/2 p-1 rounded-full hover:bg-orange-100 transition">
                <svg width="24" height="24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm"><polyline points="12 19 12 5" /><polyline points="5 12 12 5 19 12" /></svg>
              </button>
              {/* Down Arrow */}
              <button onClick={() => console.log('down')} className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 rounded-full hover:bg-orange-100 transition">
                <svg width="24" height="24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm rotate-180"><polyline points="12 19 12 5" /><polyline points="5 12 12 5 19 12" /></svg>
              </button>
              {/* Left Arrow */}
              <button onClick={() => console.log('left')} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-orange-100 transition">
                <svg width="24" height="24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm -rotate-90"><polyline points="12 19 12 5" /><polyline points="5 12 12 5 19 12" /></svg>
              </button>
              {/* Right Arrow */}
              <button onClick={() => console.log('right')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-orange-100 transition">
                <svg width="24" height="24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm rotate-90"><polyline points="12 19 12 5" /><polyline points="5 12 12 5 19 12" /></svg>
              </button>
            </div>
            {/* Minimal Action Buttons */}
            <div className="flex gap-2 w-full justify-center">
              <button className="px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold shadow border border-green-200 text-xs">Takeoff</button>
              <button className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold shadow border border-red-200 text-xs">Emergency</button>
              <button className="px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow border border-orange-200 text-xs">RTH</button>
            </div>
          </div>
          {/* Control Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-orange-100 mt-2">
            <div className="flex justify-center space-x-4">
              <button className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow border border-gray-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow border border-gray-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </button>
              <button className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow border border-gray-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
