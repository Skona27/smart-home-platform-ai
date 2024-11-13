import request from 'supertest';
import express from 'express';
import { router as deviceRouter } from '../routes/device.routes';

import { DeviceService } from '@smart-home/device-service';

const app = express();
app.use(express.json());
app.use(deviceRouter);

describe('GET /devices/:id/status', () => {
  it('should return device status if device exists', async () => {
    const mockDeviceId = 'device123';
    const mockDeviceStatus = 'ON';

    const getDeviceStatusSpy = jest
      .spyOn(DeviceService.prototype, 'getDeviceStatus')
      .mockResolvedValue(mockDeviceStatus);

    const response = await request(app)
      .get(`/devices/${mockDeviceId}/status`)
      .expect(200);

    expect(response.body.status).toBe(mockDeviceStatus);
    expect(getDeviceStatusSpy).toHaveBeenCalledWith(mockDeviceId);

    getDeviceStatusSpy.mockRestore();
  });

  it('should return 500 if device is not found', async () => {
    const mockDeviceId = 'nonexistentDeviceId';

    const getDeviceStatusSpy = jest
      .spyOn(DeviceService.prototype, 'getDeviceStatus')
      .mockRejectedValue(new Error('Device not found'));

    const response = await request(app)
      .get(`/devices/${mockDeviceId}/status`)
      .expect(500);

    expect(response.body.error).toBe('Failed to get device status');
    expect(getDeviceStatusSpy).toHaveBeenCalledWith(mockDeviceId);

    getDeviceStatusSpy.mockRestore();
  });
});
