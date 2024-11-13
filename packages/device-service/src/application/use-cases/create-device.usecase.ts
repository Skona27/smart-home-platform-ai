import { Device } from '../../domain/models/device.model';
import { DeviceService } from '../../domain/services/device.service';

export class CreateDeviceUseCase {
  constructor(private readonly deviceService: DeviceService) {}

  async execute(deviceData: { id: string; name: string }): Promise<Device> {
    const device = new Device(deviceData.id, deviceData.name);
    await this.deviceService.registerDevice(device);
    return device;
  }
}
