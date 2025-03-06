export class Cart {
  constructor(
    public readonly id: string,
    public plate: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt?: Date
  ) {}
}
