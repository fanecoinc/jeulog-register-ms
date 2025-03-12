import { TruckSetStatus } from '../enums/TruckSetStatus';
import { Cart } from './Cart';
import { TruckTractor } from './TruckTractor';
import { Person } from './Person';

export class TruckSet {
  constructor(
    public readonly id: string,
    public status: TruckSetStatus,
    public dedicatedFleet: boolean,
    public isBlocked: boolean,
    public truckTractor: TruckTractor,
    public owner: Person,
    public createdAt: Date,
    public blockedDescription?: string,
    public cartOne?: Cart,
    public cartTwo?: Cart,
    public cartThree?: Cart,
    public truckTractorId?: string,
    public cartOneId?: string,
    public cartTwoId?: string,
    public cartThreeId?: string,
    public ownerId?: string,
    public updatedAt?: Date
  ) {}
}
