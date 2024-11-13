import { DeviceService } from '../device.service';
import { DeviceRepository } from '../../repositories/device.repository';
import { Device, DeviceStatus } from '../../models/device.model';

class MockDeviceRepository implements DeviceRepository {
  private devices: Device[] = [
    new Device('1', 'Device 1', DeviceStatus.ACTIVE),
    new Device('2', 'Device 2', DeviceStatus.INACTIVE),
    new Device('3', 'Device 3', DeviceStatus.ACTIVE),
  ];

  async findById(id: string): Promise<Device | null> {
    return this.devices.find((device) => device.id === id) || null;
  }

  async save(device: Device): Promise<void> {
    this.devices.push(device);
  }

  async getAll(): Promise<Device[]> {
    return this.devices;
  }

  async updateStatus(deviceId: string, status: DeviceStatus): Promise<void> {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) {
      throw new Error('Device not found');
    }
    if (status === DeviceStatus.ACTIVE) {
      device.activate();
    } else if (status === DeviceStatus.INACTIVE) {
      device.deactivate();
    }
  }
}

describe('DeviceService', () => {
  let deviceService: DeviceService;
  let mockDeviceRepository: MockDeviceRepository;

  beforeEach(() => {
    mockDeviceRepository = new MockDeviceRepository();
    deviceService = new DeviceService(mockDeviceRepository);
  });

  it('should return the correct status for an existing device', async () => {
    const deviceId = '1';
    const status = await deviceService.getDeviceStatus(deviceId);
    expect(status).toBe(DeviceStatus.ACTIVE);
  });

  it('should throw an error if the device does not exist', async () => {
    const deviceId = '999'; // non-existing device
    await expect(deviceService.getDeviceStatus(deviceId)).rejects.toThrow(
      'Device not found'
    );
  });

  it('should create a new device correctly', async () => {
    const newDeviceId = '4';
    const newDeviceName = 'Smart Bulb';
    const newDeviceStatus = DeviceStatus.ACTIVE;

    const newDevice = new Device(newDeviceId, newDeviceName, newDeviceStatus);

    expect(newDevice).toBeInstanceOf(Device);
    expect(newDevice.id).toBe(newDeviceId);
    expect(newDevice.name).toBe(newDeviceName);
    expect(newDevice.status).toBe(newDeviceStatus);
  });

  it('should save the new device to the repository', async () => {
    const newDeviceId = '5';
    const newDeviceName = 'Smart Lock';
    const newDeviceStatus = DeviceStatus.INACTIVE;

    const newDevice = new Device(newDeviceId, newDeviceName, newDeviceStatus);

    await deviceService.registerDevice(newDevice);

    const savedDevice = await mockDeviceRepository.findById(newDeviceId);
    expect(savedDevice).toBeDefined();
    expect(savedDevice?.id).toBe(newDeviceId);
    expect(savedDevice?.name).toBe(newDeviceName);
    expect(savedDevice?.status).toBe(newDeviceStatus);
  });

  it('should return correct status for multiple devices', async () => {
    const deviceIds = ['1', '2', '3'];

    for (const deviceId of deviceIds) {
      const status = await deviceService.getDeviceStatus(deviceId);
      const device = await mockDeviceRepository.findById(deviceId);
      expect(status).toBe(device?.status);
    }
  });

  it('should activate a device and change its status to "ON"', async () => {
    const deviceId = '2';
    const device = await mockDeviceRepository.findById(deviceId);
    expect(device?.status).toBe(DeviceStatus.INACTIVE);

    await deviceService.activateDevice(deviceId);

    const activatedDevice = await mockDeviceRepository.findById(deviceId);
    expect(activatedDevice?.status).toBe(DeviceStatus.ACTIVE);
  });

  it('should deactivate a device and change its status to "OFF"', async () => {
    const deviceId = '1';
    const device = await mockDeviceRepository.findById(deviceId);
    expect(device?.status).toBe(DeviceStatus.ACTIVE);

    await deviceService.deactivateDevice(deviceId);

    const deactivatedDevice = await mockDeviceRepository.findById(deviceId);
    expect(deactivatedDevice?.status).toBe(DeviceStatus.INACTIVE);
  });
});
