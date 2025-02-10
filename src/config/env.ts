import { config } from 'dotenv';
import { resolve } from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
config({ path: resolve(process.cwd(), envFile) });

export const Config = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  ECONDOS_API_BASE_URL:
    process.env.ECONDOS_API_BASE_URL || 'http://localhost:3000',
  ECONDOS_MQTT_BROKER_URL:
    process.env.ECONDOS_MQTT_BROKER_URL || 'mqtt://mosquitto:1884',
};
