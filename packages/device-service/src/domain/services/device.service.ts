import { Device, DeviceStatus } from '../models/device.model';
import { DeviceRepository } from '../repositories/device.repository';

export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async registerDevice(device: Device): Promise<void> {
    await this.deviceRepository.save(device);
  }

  async getDeviceStatus(deviceId: string): Promise<string> {
    const device = await this.deviceRepository.findById(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }
    return device.status;
  }

  async activateDevice(deviceId: string): Promise<void> {
    const device = await this.deviceRepository.findById(deviceId);
    if (!device) throw new Error('Device not found');
    device.activate();
    await this.deviceRepository.updateStatus(deviceId, DeviceStatus.ACTIVE);
  }

  async deactivateDevice(deviceId: string): Promise<void> {
    const device = await this.deviceRepository.findById(deviceId);
    if (!device) throw new Error('Device not found');
    device.deactivate();
    await this.deviceRepository.updateStatus(deviceId, DeviceStatus.INACTIVE);
  }
}
