import { DeviceService } from '../../domain/services/device.service';
import { InMemoryDeviceRepository } from '../../infrastructure/repositories/device.repository.impl';

import { CreateDeviceUseCase } from './create-device.usecase';
import { GetDeviceStatusUseCase } from './get-device-status.usecase';

class UseCaseRegistry {
  private static instance: UseCaseRegistry;

  private createDeviceUseCase: CreateDeviceUseCase;
  private getDeviceStatusUseCase: GetDeviceStatusUseCase;

  private constructor() {
    const deviceRepository = new InMemoryDeviceRepository();
    const deviceService = new DeviceService(deviceRepository);

    this.createDeviceUseCase = new CreateDeviceUseCase(deviceService);
    this.getDeviceStatusUseCase = new GetDeviceStatusUseCase(deviceService);
  }

  public static getInstance(): UseCaseRegistry {
    if (!UseCaseRegistry.instance) {
      UseCaseRegistry.instance = new UseCaseRegistry();
    }
    return UseCaseRegistry.instance;
  }

  // Provide access to the use cases
  public getCreateDeviceUseCase(): CreateDeviceUseCase {
    return this.createDeviceUseCase;
  }

  public getGetDeviceStatusUseCase(): GetDeviceStatusUseCase {
    return this.getDeviceStatusUseCase;
  }
}

export const useCaseRegistry = UseCaseRegistry.getInstance();
