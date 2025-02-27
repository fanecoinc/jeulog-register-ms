import { Person } from '../entities/Person';

export interface IPersonRepository {
  getAll(): Promise<Person[]>;
  create(person: Person): Promise<Person>;
  findById(id: string): Promise<Person | null>;
  update(id: string, person: Partial<Person>): Promise<Person>;
}
