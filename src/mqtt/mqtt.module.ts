import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as mqtt from 'mqtt';
import { MqttService } from './mqtt.service';

@Module({
  imports: [HttpModule], // ✅ Importa o HttpModule para injetar o HttpService
  providers: [
    {
      provide: 'MQTT_CLIENT',
      useFactory: () => {
        return mqtt.connect('mqtt://mosquitto:1884', {
          username: 'admin',
          password: 'eCondosSistemas1234',
          protocolVersion: 4,
        }); // Conecta ao broker Mosquitto
      },
    },
    MqttService,
  ],
  exports: ['MQTT_CLIENT'],
})
export class MqttModule {}
