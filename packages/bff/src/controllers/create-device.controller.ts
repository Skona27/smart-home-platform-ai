import { Request, RequestHandler, Response } from 'express';
import { useCaseRegistry } from '@smart-home/device-service';

export const createDevice: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, id } = req.body;

  try {
    if (!name || !id) {
      res.status(400).json({ error: 'Device name and id are required' });
      return;
    }

    const createDeviceUseCase = useCaseRegistry.getCreateDeviceUseCase();
    const createdDevice = await createDeviceUseCase.execute({ name, id });

    res.status(201).json(createdDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create device' });
  }
};
