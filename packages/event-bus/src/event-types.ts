// Device events
export type DEVICE_CREATED_EVENT = {
  id: string;
  name: string;
  type: 'DEVICE_CREATED';
};

export type DEVICE_STATUS_CHANGED_EVENT = {
  id: string;
  status: string;
  name: string;
  type: 'DEVICE_CREATED';
};

export type DEVICE_EVENTS = DEVICE_CREATED_EVENT | DEVICE_STATUS_CHANGED_EVENT;
export type DEVICE_EVENT_TYPES = DEVICE_EVENTS['type'];

export type EventType = DEVICE_EVENT_TYPES;
