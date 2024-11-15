import { EventType } from '../event-types';
import {
  EventBus,
  Event,
  EventHandler,
} from '../interfaces/event-bus.interface';
import AWS from 'aws-sdk';

export class SqsEventBusClient implements EventBus {
  private sqs: AWS.SQS;
  private queueUrl: string;

  constructor(queueUrl: string) {
    this.sqs = new AWS.SQS();
    this.queueUrl = queueUrl;
  }

  async emit(event: Event): Promise<void> {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(event.payload),
      MessageAttributes: {
        eventType: {
          DataType: 'String',
          StringValue: event.type,
        },
      },
    };

    try {
      await this.sqs.sendMessage(params).promise();
      console.log(`Event ${event.type} sent to SQS queue`);
    } catch (err) {
      console.error('Error publishing event to SQS:', err);
    }
  }

  async on(eventType: EventType, handler: EventHandler): Promise<void> {
    // This can be a long-polling mechanism or set up via Lambda to pull messages
    // For now, let's assume the event is being processed on a per-message basis
    const params = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20, // long-polling
    };

    try {
      const data = await this.sqs.receiveMessage(params).promise();

      if (data.Messages) {
        for (const message of data.Messages) {
          const event: Event = {
            type:
              message.MessageAttributes?.eventType?.StringValue || 'Unknown',
            payload: JSON.parse(message.Body || '{}'),
          };

          if (event.type !== eventType) {
            console.warn('Received not supported event type:', {
              supported: eventType,
              received: event.type,
            });
            return;
          }

          await handler(event);

          // Delete the message from the queue after processing it
          await this.sqs
            .deleteMessage({
              QueueUrl: this.queueUrl,
              ReceiptHandle: message.ReceiptHandle!,
            })
            .promise();
        }
      }
    } catch (err) {
      console.error('Error processing SQS message:', err);
    }
  }
}
