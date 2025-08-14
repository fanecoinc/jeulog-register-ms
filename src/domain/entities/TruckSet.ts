import { TruckSetStatus } from '../enums/TruckSetStatus';
import { Cart } from './Cart';
import { TruckTractor } from './TruckTractor';
import { Person } from './Person';

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
  ) {}
}
