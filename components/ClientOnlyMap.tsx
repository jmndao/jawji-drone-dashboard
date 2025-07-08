"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function ClientOnlyMap({ center }: { center: [number, number] }) {
  const droneIcon = useMemo(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      require("leaflet/dist/leaflet.css");
      // @ts-ignore
      const L = require("leaflet");
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

  if (!MapContainer || !TileLayer || !Marker || !Popup || !droneIcon) return null;

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={droneIcon}>
        <Popup>Drone Location</Popup>
      </Marker>
    </MapContainer>
  );
} 