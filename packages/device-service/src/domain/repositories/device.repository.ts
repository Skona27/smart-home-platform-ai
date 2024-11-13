import { Device } from '../models/device.model';

export interface DeviceRepository {
  save(device: Device): Promise<void>;
  findById(deviceId: string): Promise<Device | null>;
  updateStatus(deviceId: string, status: Device['status']): Promise<void>;
}
