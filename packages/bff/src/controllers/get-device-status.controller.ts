import { Request, RequestHandler, Response } from 'express';
import { useCaseRegistry } from '@smart-home/device-service';

export const getDeviceStatus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ error: 'Device ID is required' });
      return;
    }

    const getDeviceStatusUseCase = useCaseRegistry.getGetDeviceStatusUseCase();

    const status = await getDeviceStatusUseCase.execute(id);

    res.status(200).json({ status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get device status' });
  }
};
