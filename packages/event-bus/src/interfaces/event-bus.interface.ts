export interface Event {
  type: string;
  payload: any;
}

export type EventHandler = (event: Event) => Promise<void>;

export interface EventBus {
  /**
   * Publishes an event to the event bus.
   * @param event - The event message to publish.
   */
  emit(event: Event): Promise<void>;

  /**
   * Starts polling for events from the event bus.
   * @param eventType - The type of incoming event.
   * @param handler - The handler function to process incoming events.
   */
  on(eventType: string, handler: EventHandler): Promise<void>;
}
