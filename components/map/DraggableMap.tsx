"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Move, RotateCcw, Maximize2, Minimize2, Settings } from "lucide-react";
import L from "leaflet";
import { MapSettings, FlightData } from "../../types/drone";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface DraggableMapProps {
  flightData: FlightData;
  mapSettings: MapSettings;
  onMapSettingsChange: (settings: Partial<MapSettings>) => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  initialPosition?: { x: number; y: number };
  containerBounds?: DOMRect;
  className?: string;
}

const MAP_STYLES = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
  hybrid: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
  terrain: {
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
    attribution:
      "Map tiles by Stamen Design, CC BY 3.0 &mdash; Map data &copy; OpenStreetMap contributors",
  },
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
};

const MAP_SIZES = {
  small: { width: 280, height: 200 },
  medium: { width: 350, height: 250 },
  large: { width: 420, height: 300 },
};

export default function DraggableMap({
  flightData,
  mapSettings,
  onMapSettingsChange,
  onPositionChange,
  containerBounds,
  className = "",
}: DraggableMapProps) {
  const currentSize = MAP_SIZES[mapSettings.mapSize || "medium"];

  // Default to next to the time control (02:09), below it
  const getDefaultPosition = () => {
    if (!containerBounds) return { x: 20, y: 20 };
    return {
      x: containerBounds.width - currentSize.width - 20, // Right side
      y: 60, // Below the recording indicator area
    };
  };

  const [position, setPosition] = useState(getDefaultPosition());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showSettings, setShowSettings] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapKey, setMapKey] = useState(0); // Force re-render when style changes
  const mapRef = useRef<HTMLDivElement>(null);

  const droneIcon = React.useMemo(() => {
    if (typeof window !== "undefined" && L) {
      return L.icon({
        iconUrl: "/jawu-drone1.png",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });
    }
    return undefined;
  }, []);

  // Update position when container bounds or size changes
  useEffect(() => {
    if (containerBounds) {
      const defaultPos = getDefaultPosition();
      setPosition(defaultPos);
      onPositionChange(defaultPos);
    }
  }, [containerBounds, currentSize]);

  const constrainPosition = (newPosition: { x: number; y: number }) => {
    if (!containerBounds) return newPosition;

    const maxX = containerBounds.width - currentSize.width;
    const maxY = containerBounds.height - currentSize.height;

    return {
      x: Math.max(0, Math.min(maxX, newPosition.x)),
      y: Math.max(0, Math.min(maxY, newPosition.y)),
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".map-header")) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerBounds) return;

    const newPosition = constrainPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });

    setPosition(newPosition);
    onPositionChange(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
  }, [isDragging, dragStart, containerBounds]);

  const resetPosition = () => {
    const defaultPos = getDefaultPosition();
    setPosition(defaultPos);
    onPositionChange(defaultPos);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStyleChange = (newStyle: MapSettings["viewStyle"]) => {
    onMapSettingsChange({ viewStyle: newStyle });
    // Force map re-render to prevent style conflicts
    setMapKey((prev) => prev + 1);
  };

  const currentMapStyle = MAP_STYLES[mapSettings.viewStyle];

  return (
    <div
      ref={mapRef}
      className={`absolute bg-black/80 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-2xl transition-all duration-300 ${
        isDragging
          ? "cursor-grabbing shadow-orange-500/20 z-50"
          : "cursor-grab z-40"
      } ${isExpanded ? "z-50" : "z-40"} ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: isExpanded
          ? Math.min(
              containerBounds?.width ? containerBounds.width * 0.6 : 600,
              800
            )
          : currentSize.width,
        height: isExpanded
          ? Math.min(
              containerBounds?.height ? containerBounds.height * 0.6 : 400,
              500
            )
          : currentSize.height,
      }}
    >
      {/* Map Header */}
      <div
        className="map-header flex items-center justify-between p-2 bg-gray-900/90 backdrop-blur-sm rounded-t-xl border-b border-gray-600/30 cursor-grab select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <Move className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-300">Live Map</span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-gray-700/50 rounded text-gray-400 hover:text-white transition-colors"
            title="Map Settings"
          >
            <Settings className="w-3 h-3" />
          </button>
          <button
            onClick={resetPosition}
            className="p-1 hover:bg-gray-700/50 rounded text-gray-400 hover:text-white transition-colors"
            title="Reset Position"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            onClick={toggleExpand}
            className="p-1 hover:bg-gray-700/50 rounded text-gray-400 hover:text-white transition-colors"
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-600/50 p-3 z-10">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Map Style
              </label>
              <select
                value={mapSettings.viewStyle}
                onChange={(e) =>
                  handleStyleChange(e.target.value as MapSettings["viewStyle"])
                }
                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="satellite">Satellite</option>
                <option value="hybrid">Hybrid</option>
                <option value="terrain">Terrain</option>
                <option value="street">Street</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Size</label>
              <select
                value={mapSettings.mapSize || "medium"}
                onChange={(e) =>
                  onMapSettingsChange({
                    mapSize: e.target.value as "small" | "medium" | "large",
                  })
                }
                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={mapSettings.showFlightPath}
                  onChange={(e) =>
                    onMapSettingsChange({ showFlightPath: e.target.checked })
                  }
                  className="rounded bg-gray-800 border-gray-600 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs text-gray-300">Flight Path</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={mapSettings.showNoFlyZones}
                  onChange={(e) =>
                    onMapSettingsChange({ showNoFlyZones: e.target.checked })
                  }
                  className="rounded bg-gray-800 border-gray-600 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs text-gray-300">No-Fly Zones</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative w-full h-full overflow-hidden rounded-b-xl">
        {containerBounds && (
          <MapContainer
            key={`${mapSettings.viewStyle}-${mapKey}`} // Force re-render when style changes
            center={[
              flightData.coordinates.latitude,
              flightData.coordinates.longitude,
            ]}
            zoom={mapSettings.zoom}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            zoomControl={true}
            attributionControl={false}
            whenReady={(map) => {
              // Ensure proper sizing after map is ready
              setTimeout(() => {
                map.target.invalidateSize();
              }, 100);
            }}
          >
            <TileLayer
              key={`${mapSettings.viewStyle}-${mapKey}`} // Force tile layer re-render
              url={currentMapStyle.url}
              attribution={currentMapStyle.attribution}
            />
            <Marker
              position={[
                flightData.coordinates.latitude,
                flightData.coordinates.longitude,
              ]}
              icon={droneIcon}
            />
          </MapContainer>
        )}

        {/* Map Info Overlay */}
        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-xs">
          <div className="text-gray-300">
            Lat: {flightData.coordinates.latitude.toFixed(6)}
          </div>
          <div className="text-gray-300">
            Lng: {flightData.coordinates.longitude.toFixed(6)}
          </div>
          <div className="text-gray-400 text-[10px] mt-1">
            Alt: {flightData.altitude}m • Spd: {flightData.speed}km/h
          </div>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-300">
          Zoom: {mapSettings.zoom}
        </div>
      </div>
    </div>
  );
}
