import { TruckSetStatus } from '../enums/TruckSetStatus';
import { Cart } from './Cart';
import { TruckTractor } from './TruckTractor';
import { Person } from './Person';
import { DomainValidationError } from '@/infrastructure/exceptions/DomainValidationError';

export class TruckSet {
  constructor(
    public readonly id: string,
    public status: TruckSetStatus,
    public dedicatedFleet: boolean,
    public truckTractor: TruckTractor,
    public owner: Person,
    public createdAt: Date,
    public truckTractorId: string,
    public ownerId: string,
    public blockedDescription?: string,
    public cartOne?: Cart,
    public cartTwo?: Cart,
    public cartThree?: Cart,
    public cartOneId?: string,
    public cartTwoId?: string,
    public cartThreeId?: string,
    public updatedAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (
      this.truckTractor.isTruck &&
      (this.cartOne || this.cartTwo || this.cartThree)
    ) {
      throw new DomainValidationError(
        'Cavalo do tipo Truck não pode ter carretas'
      );
    }

    if (
      !this.truckTractor.isTruck &&
      !this.cartOne &&
      !this.cartTwo &&
      !this.cartThree
    ) {
      throw new DomainValidationError(
        'Cavalo não-truck deve ter pelo menos uma carreta'
      );
    }
  }
}
