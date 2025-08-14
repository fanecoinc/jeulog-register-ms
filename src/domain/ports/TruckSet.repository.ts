import { TruckSet } from '../entities/TruckSet';

export interface ITruckSetRepository {
  getAll(): Promise<TruckSet[]>;
  create(truckSet: TruckSet): Promise<TruckSet>;
  findById(id: string): Promise<TruckSet | null>;
  update(id: string, truckSet: Partial<TruckSet>): Promise<TruckSet>;
  delete(id: string): Promise<null>;
  findByTruckTractorId(truckTractorId: string): Promise<TruckSet | null>;
  findByCartId(cartId: string): Promise<TruckSet | null>;
}
