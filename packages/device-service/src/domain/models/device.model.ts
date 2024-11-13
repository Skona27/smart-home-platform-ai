export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface DeviceData {
  id: string;
  name: string;
  status: DeviceStatus;
  createdAt: Date;
}

export class Device {
  private _status: DeviceStatus;

  constructor(
    public readonly id: string,
    public name: string,
    status: DeviceStatus = DeviceStatus.INACTIVE,
    public readonly createdAt: Date = new Date()
  ) {
    this._status = status;
  }

  public get status(): DeviceStatus {
    return this._status;
  }

  public activate(): void {
    this._status = DeviceStatus.ACTIVE;
  }

  public deactivate(): void {
    this._status = DeviceStatus.INACTIVE;
  }
}
