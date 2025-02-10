import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Config } from '../config/env';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    @Inject('MQTT_CLIENT') private readonly mqttClient: mqtt.MqttClient,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    // Conecta ao broker e se inscreve no tópico
    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.mqttClient.subscribe('actuator/+', (err) => {
        if (!err) console.log('Subscribed to topic: actuator/+');
      });
      this.mqttClient.subscribe('/from-device/#', (err) => {
        if (!err) console.log('Subscribed to topic: actuator/+');
      });
    });

    // Processa as mensagens recebidas
    this.mqttClient.on('message', (topic, message) => {
      console.log(`Received message on ${topic}: ${message.toString()}`);
      // this.sendToBackend(topic, message.toString());
    });
  }

  private async sendToBackend(topic: string, message: string) {
    try {
      const backendUrl = `${Config.ECONDOS_API_BASE_URL}/mqttEvents`;
      const response = await firstValueFrom(
        this.httpService.post(backendUrl, {
          topic,
          message,
        }),
      );
      console.log('Message sent to backend:', response.data);
    } catch (error) {
      console.error('Failed to send message to backend:', error.message);
    }
  }
}
