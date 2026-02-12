"use client";

import { useEffect } from "react";
import mqtt_client from "./mqtt_client";

export default function MqttLoader() {
  useEffect(() => {
    // Only set up connection handlers once
    const handleConnect = () => {
      console.log("MQTT connected");
    };

    const handleError = (error: any) => {
      console.error("MQTT Error:", error);
    };

    // Subscribe to events
    mqtt_client.on("connect", handleConnect);
    mqtt_client.on("error", handleError);

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      mqtt_client.off("connect", handleConnect);
      mqtt_client.off("error", handleError);
    };
  }, []);

  return null;
}
