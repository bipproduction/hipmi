import mqtt from "mqtt";

declare global {
  var mqtt_client: mqtt.MqttClient;
}

// Initialize MQTT client with proper error handling and reconnection settings
let mqtt_client: mqtt.MqttClient;

if (typeof window === 'undefined') {
  // Server-side code
  mqtt_client = globalThis.mqtt_client || (() => {
    const client = mqtt.connect("wss://io.wibudev.com", {
      reconnectPeriod: 5000, // Reconnect every 5 seconds
      connectTimeout: 30 * 1000, // 30 second timeout
      // Clean session to avoid message queue buildup
      clean: true,
      // Reduce unnecessary pings
      keepalive: 60
    });

    // Prevent multiple initializations
    globalThis.mqtt_client = client;

    // Add error handling
    client.on('error', (error) => {
      console.error('MQTT Connection Error:', error);
    });

    client.on('reconnect', () => {
      console.log('MQTT Reconnecting...');
    });

    client.on('close', () => {
      console.log('MQTT Connection Closed');
    });

    return client;
  })();
} else {
  // Client-side code - initialize only once
  if (!(globalThis as any).mqtt_client) {
    (globalThis as any).mqtt_client = mqtt.connect("wss://io.wibudev.com", {
      reconnectPeriod: 5000, // Reconnect every 5 seconds
      connectTimeout: 30 * 1000, // 30 second timeout
      // Clean session to avoid message queue buildup
      clean: true,
      // Reduce unnecessary pings
      keepalive: 60
    });

    // Add error handling
    (globalThis as any).mqtt_client.on('error', (error: any) => {
      console.error('MQTT Connection Error:', error);
    });

    (globalThis as any).mqtt_client.on('reconnect', () => {
      console.log('MQTT Reconnecting...');
    });

    (globalThis as any).mqtt_client.on('close', () => {
      console.log('MQTT Connection Closed');
    });
  }
  
  mqtt_client = (globalThis as any).mqtt_client;
}

export default mqtt_client;
