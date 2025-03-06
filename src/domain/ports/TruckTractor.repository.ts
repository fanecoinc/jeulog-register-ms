import { TruckTractor } from '../entities/TruckTractor';

export interface ITruckTractorRepository {
  getAll(): Promise<TruckTractor[]>;
  create(truckTractor: TruckTractor): Promise<TruckTractor>;
  findById(id: string): Promise<TruckTractor | null>;
  update(
    id: string,
    truckTractor: Partial<TruckTractor>
  ): Promise<TruckTractor>;
}
