import { DeviceRepository } from '../../domain/repositories/device.repository';
import { Device, DeviceStatus } from '../../domain/models/device.model';

export class InMemoryDeviceRepository implements DeviceRepository {
  save(device: Device): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateStatus(deviceId: string, status: Device['status']): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private devices: Device[] = [
    new Device('1', 'Smart Light', DeviceStatus.ACTIVE),
    new Device('2', 'Thermostat', DeviceStatus.INACTIVE),
    new Device('3', 'Air Purifier', DeviceStatus.ACTIVE),
  ];

  async findById(id: string): Promise<Device | null> {
    const device = this.devices.find((d) => d.id === id);
    return device || null;
  }
}
