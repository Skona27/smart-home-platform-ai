import { DeviceService } from '../../domain/services/device.service';

export class GetDeviceStatusUseCase {
  constructor(private readonly deviceService: DeviceService) {}

  async execute(deviceId: string): Promise<string> {
    const deviceStatus = await this.deviceService.getDeviceStatus(deviceId);
    if (!deviceStatus) throw new Error('Device not found');
    return deviceStatus;
  }
}
