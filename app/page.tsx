"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";
import { User } from "lucide-react";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function Home() {
  // Saly Aerodrome, Senegal coordinates
  const droneLocation: [number, number] = [14.4522, -17.0089];
  const mapCenter = droneLocation;

  // Fix: Only create the drone icon on the client
  const droneIcon = useMemo(() => {
    if (typeof window !== "undefined" && L) {
      return L.icon({
        iconUrl: "/jawu-drone1.png",
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
        className: "drone-marker-icon"
      });
    }
    return undefined;
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
          <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col items-center justify-center min-h-[320px] max-h-[45vh] relative border border-orange-100">
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
          <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col items-center flex-1 border border-orange-100 min-h-[300px] h-full">
            <div className="w-full flex items-center justify-between mb-2">
              <div/>  
              <div className="flex items-center gap-2"></div>
            </div>
            <div className="w-full flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-orange-50 flex flex-col items-center justify-center border border-orange-100 shadow-inner">
              {/* Leaflet Map */}
              <div className="w-full h-full min-h-[250px] min-w-[250px]" style={{ height: 300, width: '100%' }}>
                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={droneLocation} icon={droneIcon}>
                    <Popup>Drone Location</Popup>
                  </Marker>
                </MapContainer>
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
          <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col items-center border border-orange-100">
            <div className="flex flex-col items-center mb-2">
              <Image src="/jawu-drone1.png" alt="Jawji Mini Drone" width={150} height={150} className="mb-2" />
            </div>
            <div className="text-center mb-2">
              <span className="block text-lg font-bold text-orange-500">Jawji Mini Drone</span>
        
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 w-full text-xs">
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Battery</span>
                <span className="font-bold text-green-500 text-sm">92%</span>
                <div className="w-full bg-gray-200 rounded-full h-0.5 mt-1">
                  <div className="bg-green-500 h-0.5 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Altitude</span>
                <span className="font-bold text-sm">120m</span>
                <span className="text-gray-400 text-xs mt-0.5">Max: 500m</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Speed</span>
                <span className="font-bold text-sm">15 m/s</span>
                <span className="text-gray-400 text-xs mt-0.5">Max: 25 m/s</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Signal</span>
                <span className="font-bold text-green-500 text-sm">Strong</span>
                <div className="flex gap-0.5 mt-1">
                  <div className="w-0.5 h-2 bg-green-500 rounded"></div>
                  <div className="w-0.5 h-2 bg-green-500 rounded"></div>
                  <div className="w-0.5 h-2 bg-green-500 rounded"></div>
                  <div className="w-0.5 h-2 bg-green-500 rounded"></div>
                </div>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Resolution</span>
                <span className="font-bold text-sm">4K</span>
                <span className="text-gray-400 text-xs mt-0.5">30 FPS</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-100 rounded-lg border border-orange-100">
                <span className="text-gray-500 text-xs mb-0.5">Flight Time</span>
                <span className="font-bold text-sm">02:15</span>
                <span className="text-gray-400 text-xs mt-0.5">Remaining: 18:45</span>
              </div>
            </div>
        </div>
  
          {/* Control Pad - Modern Circular Visual with Minimal Action Buttons and Arrows */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border border-orange-100 mt-2">
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
        </aside>
      </main>
    </div>
  );
}
