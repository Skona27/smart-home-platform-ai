import { Device, DeviceStatus } from '../device.model';

describe('Device Model', () => {
  it('should initialize with the given status', () => {
    const device = new Device('device1', 'Thermostat', DeviceStatus.INACTIVE);
    expect(device.status).toBe(DeviceStatus.INACTIVE);
  });

  it('should default to INACTIVE status if not provided', () => {
    const device = new Device('device2', 'Smart Light');
    expect(device.status).toBe(DeviceStatus.INACTIVE);
  });

  it('should activate the device and change its status to ON', () => {
    const device = new Device('device3', 'Smart Light', DeviceStatus.INACTIVE);
    device.activate();
    expect(device.status).toBe(DeviceStatus.ACTIVE);
  });

  it('should deactivate the device and change its status to OFF', () => {
    const device = new Device('device4', 'Smart Light', DeviceStatus.ACTIVE);
    device.deactivate();
    expect(device.status).toBe(DeviceStatus.INACTIVE);
  });

  it('should not change status if device is already ON and activate is called', () => {
    const device = new Device('device5', 'Camera', DeviceStatus.ACTIVE);
    device.activate();
    expect(device.status).toBe(DeviceStatus.ACTIVE);
  });

  it('should not change status if device is already OFF and deactivate is called', () => {
    const device = new Device('device6', 'Camera', DeviceStatus.INACTIVE);
    device.deactivate();
    expect(device.status).toBe(DeviceStatus.INACTIVE);
  });

  it('should initialize with correct id, name, and createdAt timestamp', () => {
    const createdAt = new Date();
    const device = new Device(
      'device7',
      'Door Lock',
      DeviceStatus.INACTIVE,
      createdAt
    );
    expect(device.id).toBe('device7');
    expect(device.name).toBe('Door Lock');
    expect(device.createdAt).toBe(createdAt);
  });
});
