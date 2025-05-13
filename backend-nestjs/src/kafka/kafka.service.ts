import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { configuration } from '~/env';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private producer?: Producer;

  constructor() {
    this.kafka = new Kafka({
      brokers: configuration.KAFKA.BROKERS,
      clientId: 'post-call-analysis',
    });
  }

  async onModuleInit() {
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
    });
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer?.disconnect();
  }

  send: Producer['send'] = (...args) => {
    return this.producer!.send(...args);
  };
}
