"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-2 bg-gray-900/80 shadow-lg backdrop-blur-md border-b border-gray-700/50">
        <div className="flex items-center">
          <Image src="/jawji-logo-removebg-preview.png" alt="Jawji Logo" width={32} height={32} className="rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Controller</span>
            <span className="font-semibold text-xs">Operator 1</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Status</span>
            <span className="font-semibold text-green-400 flex items-center gap-1 text-xs">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              Connected
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Time</span>
            <span className="font-semibold text-xs">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full h-[calc(100vh-56px)]">
        {/* Left: Live Stream & Map */}
        <section className="flex-1 flex flex-col gap-3 min-w-[350px] h-full">
          {/* Live Stream */}
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-3 flex flex-col items-center justify-center min-h-[320px] max-h-[45vh] relative border border-gray-700/50">
            <div className="absolute top-6 left-6 bg-red-600 text-xs px-3 py-1 rounded-full font-bold animate-pulse flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <div className="bg-gray-800 text-xs px-3 py-1 rounded-full">4K</div>
              <div className="bg-green-600 text-xs px-3 py-1 rounded-full">REC</div>
            </div>
            <div className="relative w-full h-80 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center overflow-hidden border border-gray-600 shadow-inner">
              {/* Placeholder for video stream */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600">
                  <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                </div>
                <span className="text-gray-400 text-xl font-semibold">Live Stream</span>
                <p className="text-gray-600 text-sm mt-2">Camera feed will appear here</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span>Resolution: 4K</span>
                  <span>•</span>
                  <span>FPS: 30</span>
                  <span>•</span>
                  <span>Bitrate: 50 Mbps</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 font-semibold transition-colors shadow-lg text-xs">Start</button>
              <button className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 font-semibold transition-colors text-xs">Stop</button>
              <button className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition-colors text-xs">Record</button>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-3 flex flex-col items-center flex-1 border border-gray-700/50 min-h-[300px] h-full">
            <div className="w-full flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Flight Path & GPS</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">GPS:</span>
                <span className="text-xs font-mono">24.7136°N, 46.6753°E</span>
              </div>
            </div>
            <div className="w-full flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-600 shadow-inner">
              {/* Placeholder for map */}
              <div className="text-center w-full h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-600">
                  <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-gray-400 text-lg font-semibold">Map View</span>
                <p className="text-gray-600 text-sm mt-2">Flight path visualization</p>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>Altitude: 120m</span>
                  <span>•</span>
                  <span>Distance: 2.3km</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-400">Home Point</span>
              <span className="text-green-400">Set</span>
              <span className="text-gray-400">Return Altitude</span>
              <span className="text-white">100m</span>
            </div>
          </div>
        </section>

        {/* Right: Telemetry & Controls */}
        <aside className="w-full lg:w-80 flex flex-col gap-3">
          {/* Telemetry Panel */}
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-3 flex flex-col items-center border border-gray-700/50">
            <Image src="/jawu-drone1.png" alt="Drone" width={60} height={60} className="mb-2" />
            <h2 className="text-base font-bold mb-3">Telemetry Data</h2>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 w-full text-xs">
              <div className="flex flex-col items-center p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <span className="text-gray-400 text-xs mb-0.5">Battery</span>
                <span className="font-bold text-green-400 text-sm">92%</span>
                <div className="w-full bg-gray-700 rounded-full h-0.5 mt-1">
                  <div className="bg-green-400 h-0.5 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <span className="text-gray-400 text-xs mb-0.5">Altitude</span>
                <span className="font-bold text-sm">120m</span>
                <span className="text-gray-500 text-xs mt-0.5">Max: 500m</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <span className="text-gray-400 text-xs mb-0.5">Speed</span>
                <span className="font-bold text-sm">15 m/s</span>
                <span className="text-gray-500 text-xs mt-0.5">Max: 25 m/s</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <span className="text-gray-400 text-xs mb-0.5">Signal</span>
                <span className="font-bold text-green-400 text-sm">Strong</span>
                <div className="flex gap-0.5 mt-1">
                  <div className="w-0.5 h-2 bg-green-400 rounded"></div>
                  <div className="w-0.5 h-2 bg-green-400 rounded"></div>
                  <div className="w-0.5 h-2 bg-green-400 rounded"></div>
                  <div className="w-0.5 h-2 bg-green-400 rounded"></div>
                </div>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <span className="text-gray-400 text-xs mb-0.5">Resolution</span>
                <span className="font-bold text-sm">4K</span>
                <span className="text-gray-500 text-xs mt-0.5">30 FPS</span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <span className="text-gray-400 text-xs mb-0.5">Flight Time</span>
                <span className="font-bold text-sm">02:15</span>
                <span className="text-gray-500 text-xs mt-0.5">Remaining: 18:45</span>
              </div>
            </div>
            <div className="w-full mt-3 p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">GPS Coordinates</span>
                <span className="text-green-400">Locked</span>
              </div>
              <div className="font-mono text-xs">24.7136°N, 46.6753°E</div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-400">Satellites</span>
                <span className="text-white">12</span>
              </div>
            </div>
          </div>

          {/* Control Pad */}
          <div className="bg-gray-900/90 rounded-2xl shadow-xl p-3 flex flex-col items-center border border-gray-700/50">
            <h3 className="text-base font-semibold mb-3">Control Pad</h3>
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-40">
              <div></div>
              <button className="col-start-2 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-bold text-lg transition-all duration-200 border border-gray-600 shadow-lg hover:shadow-xl active:scale-95">↑</button>
              <div></div>
              <button className="row-start-2 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-bold text-lg transition-all duration-200 border border-gray-600 shadow-lg hover:shadow-xl active:scale-95">←</button>
              <div className="row-start-2 col-start-2"></div>
              <button className="row-start-2 col-start-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-bold text-lg transition-all duration-200 border border-gray-600 shadow-lg hover:shadow-xl active:scale-95">→</button>
              <div></div>
              <button className="row-start-3 col-start-2 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-bold text-lg transition-all duration-200 border border-gray-600 shadow-lg hover:shadow-xl active:scale-95">↓</button>
              <div></div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 font-semibold transition-colors text-xs shadow-lg">Land</button>
              <button className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition-colors text-xs shadow-lg">Emergency</button>
              <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-colors text-xs shadow-lg">RTH</button>
            </div>
            <div className="w-full mt-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Flight Mode</span>
                <span className="text-orange-400 font-semibold">Manual</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
