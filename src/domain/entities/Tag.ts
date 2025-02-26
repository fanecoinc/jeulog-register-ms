export class Tag {
  constructor(
    public readonly id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt?: Date,
    public deletedAt?: Date
  ) {}
}
