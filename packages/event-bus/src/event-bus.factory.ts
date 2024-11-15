import { EventBus } from './interfaces/event-bus.interface';
import { SnsEventBusClient } from './client/event-bus-sns.client';
import { SqsEventBusClient } from './client/event-bus-sqs.client';

export class EventBusFactory {
  static createSnsEventBus(topicArn: string): EventBus {
    return new SnsEventBusClient(topicArn);
  }

  static createSqsEventBus(queueUrl: string): EventBus {
    return new SqsEventBusClient(queueUrl);
  }
}
