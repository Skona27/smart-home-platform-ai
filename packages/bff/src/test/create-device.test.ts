import request from 'supertest';
import express from 'express';
import { router as deviceRouter } from '../routes/device.routes';

import { DeviceService } from '@smart-home/device-service';

const app = express();
app.use(express.json());
app.use(deviceRouter);

describe('POST /devices', () => {
  it('should create a new device and return it with status 201', async () => {
    const newDevice = {
      name: 'Smart Light',
      id: '1234',
    };

    const response = await request(app)
      .post('/devices')
      .send(newDevice)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('id', newDevice.id);
    expect(response.body).toHaveProperty('name', newDevice.name);
  });

  it('should return an error if properties are missing', async () => {
    const newDevice = {
      name: 'Smart Light',
      id: null, // Invalid ID to trigger error
    };

    const response = await request(app)
      .post('/devices')
      .send(newDevice)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      'error',
      'Device name and id are required'
    );
  });

  it('should return 500 if device creation fails due to server error', async () => {
    const createDeviceSpy = jest
      .spyOn(DeviceService.prototype, 'registerDevice')
      .mockRejectedValue(new Error('Database error'));

    const newDevice = { name: 'Device 1', id: 'device123' };

    const response = await request(app)
      .post('/devices')
      .send(newDevice)
      .expect(500);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Failed to create device');

    createDeviceSpy.mockRestore();
  });
});
