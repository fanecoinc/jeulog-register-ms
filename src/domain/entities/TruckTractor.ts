export class TruckTractor {
  constructor(
    public readonly id: string,
    public plate: string,
    public isTruck: boolean,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt?: Date
  ) {}
}
