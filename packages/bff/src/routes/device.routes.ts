import { Router } from 'express';
import { createDevice } from '../controllers/create-device.controller';
import { getDeviceStatus } from '../controllers/get-device-status.controller';

const router = Router();

router.post('/devices', createDevice);
router.get('/devices/:id/status', getDeviceStatus);

export { router };
