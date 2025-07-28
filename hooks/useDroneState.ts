import { useState, useEffect, useCallback } from "react";
import {
  DroneState,
  JoystickInput,
  UISettings,
  MapSettings,
  DroneControls,
} from "../types/drone";

interface UseDroneStateProps {
  initialState: DroneState;
  apiEndpoint?: string;
  updateInterval?: number;
}

interface UseDroneStateReturn {
  droneState: DroneState;
  updateUISettings: (settings: Partial<UISettings>) => void;
  updateMapSettings: (settings: Partial<MapSettings>) => void;
  updateControls: (controls: Partial<DroneControls>) => void;
  sendJoystickInput: (input: Partial<JoystickInput>) => void;
  sendCommand: (command: string, params?: any) => Promise<void>;
  isConnected: boolean;
  lastUpdate: Date | null;
}

export const useDroneState = ({
  initialState,
  apiEndpoint = "/api/drone",
  updateInterval = 1000,
}: UseDroneStateProps): UseDroneStateReturn => {
  const [droneState, setDroneState] = useState<DroneState>(initialState);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Update UI settings
  const updateUISettings = useCallback((settings: Partial<UISettings>) => {
    setDroneState((prev) => ({
      ...prev,
      ui: { ...prev.ui, ...settings },
    }));
  }, []);

  // Update map settings
  const updateMapSettings = useCallback((settings: Partial<MapSettings>) => {
    setDroneState((prev) => ({
      ...prev,
      map: { ...prev.map, ...settings },
    }));
  }, []);

  // Update drone controls
  const updateControls = useCallback((controls: Partial<DroneControls>) => {
    setDroneState((prev) => ({
      ...prev,
      controls: { ...prev.controls, ...controls },
    }));
  }, []);

  // Send joystick input to drone
  const sendJoystickInput = useCallback(
    async (input: Partial<JoystickInput>) => {
      try {
        if (apiEndpoint) {
          await fetch(`${apiEndpoint}/joystick`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          });
        }
        console.log("Joystick input sent:", input);
      } catch (error) {
        console.error("Failed to send joystick input:", error);
        setIsConnected(false);
      }
    },
    [apiEndpoint]
  );

  // Send command to drone
  const sendCommand = useCallback(
    async (command: string, params?: any) => {
      try {
        if (apiEndpoint) {
          const response = await fetch(`${apiEndpoint}/command`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ command, params }),
          });

          if (!response.ok) {
            throw new Error(`Command failed: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Command sent successfully:", command, result);
        }
      } catch (error) {
        console.error("Failed to send command:", error);
        setIsConnected(false);
        throw error;
      }
    },
    [apiEndpoint]
  );

  // Fetch drone state updates
  const fetchDroneState = useCallback(async () => {
    try {
      if (apiEndpoint) {
        const response = await fetch(`${apiEndpoint}/state`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch drone state: ${response.statusText}`
          );
        }

        const newState = await response.json();
        setDroneState((prev) => ({
          ...prev,
          ...newState,
          // Preserve UI settings locally
          ui: prev.ui,
        }));
        setLastUpdate(new Date());
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Failed to fetch drone state:", error);
      setIsConnected(false);
    }
  }, [apiEndpoint]);

  // Set up periodic updates
  useEffect(() => {
    if (!apiEndpoint || updateInterval <= 0) return;

    const interval = setInterval(fetchDroneState, updateInterval);

    // Initial fetch
    fetchDroneState();

    return () => clearInterval(interval);
  }, [fetchDroneState, updateInterval, apiEndpoint]);

  // Simulate real-time updates for demo purposes (remove when real API is available)
  useEffect(() => {
    if (apiEndpoint) return; // Skip simulation if real API is configured

    const simulationInterval = setInterval(() => {
      setDroneState((prev) => ({
        ...prev,
        battery: {
          ...prev.battery,
          percentage: Math.max(0, prev.battery.percentage - 0.1),
        },
        flight: {
          ...prev.flight,
          altitude: prev.flight.altitude + (Math.random() - 0.5) * 2,
          speed: Math.max(0, prev.flight.speed + (Math.random() - 0.5) * 5),
          coordinates: {
            latitude:
              prev.flight.coordinates.latitude + (Math.random() - 0.5) * 0.0001,
            longitude:
              prev.flight.coordinates.longitude +
              (Math.random() - 0.5) * 0.0001,
          },
          heading: (prev.flight.heading + (Math.random() - 0.5) * 10) % 360,
        },
        telemetry: {
          ...prev.telemetry,
          signalStrength: Math.max(
            0,
            Math.min(
              100,
              prev.telemetry.signalStrength + (Math.random() - 0.5) * 10
            )
          ),
          temperature: prev.telemetry.temperature + (Math.random() - 0.5) * 2,
        },
      }));
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(simulationInterval);
  }, [apiEndpoint]);

  return {
    droneState,
    updateUISettings,
    updateMapSettings,
    updateControls,
    sendJoystickInput,
    sendCommand,
    isConnected,
    lastUpdate,
  };
};
