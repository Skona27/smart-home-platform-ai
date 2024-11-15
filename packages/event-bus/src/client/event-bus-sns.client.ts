import {
  EventBus,
  Event,
  EventHandler,
} from '../interfaces/event-bus.interface';
import AWS from 'aws-sdk';

export class SnsEventBusClient implements EventBus {
  private sns: AWS.SNS;
  private topicArn: string;

  constructor(topicArn: string) {
    this.sns = new AWS.SNS();
    this.topicArn = topicArn;
  }

  async emit(event: Event): Promise<void> {
    const params = {
      Message: JSON.stringify(event.payload),
      TopicArn: this.topicArn,
      MessageAttributes: {
        eventType: {
          DataType: 'String',
          StringValue: event.type,
        },
      },
    };

    try {
      await this.sns.publish(params).promise();
      console.log(`Event ${event.type} sent to SNS topic`);
    } catch (err) {
      console.error('Error publishing event to SNS:', err);
    }
  }

  // In SNS, we usually don't subscribe directly; subscribers are usually handled by Lambda, etc.
  async on(_eventType: string, handler: EventHandler): Promise<void> {
    console.warn(
      'SNS does not support direct event subscription in this setup. Use Lambda or other subscribers.'
    );
  }
}
