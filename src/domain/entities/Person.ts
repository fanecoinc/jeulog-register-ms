import { Tag } from './Tag';

export class Person {
  constructor(
    public readonly id: string,
    public legalPerson: boolean,
    public document: string,
    public name: string,
    public city: string,
    public state: string,
    public cep: string,
    public key: string,
    public isHeadquarter: boolean,
    public isOrigin: boolean,
    public isDestiny: boolean,
    public isCarrier: boolean,
    public isActive: boolean,
    public tags: Tag[] = [],
    public createdAt: Date,
    public polygon?: string,
    public latitude?: number,
    public longitude?: number,
    public updatedAt?: Date,
    public deletedAt?: Date
  ) {}
}
