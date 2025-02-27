import { ITagRepository } from '@/domain/ports/Tag.repository';
import { IPersonRepository } from '@/domain/ports/Person.repository';
import {
  CreatePersonDTO,
  UpdatePersonDTO,
  PersonResponseDTO,
  toPersonResponseDTO,
} from '../dtos/Person.dto';
import { Person } from '@/domain/entities/Person';
import { v4 as uuidv4 } from 'uuid';
import { Errors } from 'moleculer';

export class PersonUseCase {
  constructor(
    private readonly personRepository: IPersonRepository,
    private readonly tagRepository: ITagRepository
  ) {}

  async createPerson(dto: CreatePersonDTO): Promise<PersonResponseDTO> {
    let tags;
    if (dto.tagIds) {
      tags = await Promise.all(
        dto.tagIds.map(async (id) => {
          const obj = await this.tagRepository.findById(id);
          if (!obj) {
            throw new Errors.MoleculerClientError(
              'Registro não encontrado',
              404,
              'P2025'
            );
          }
          return obj;
        })
      );
    }

    const person = new Person(
      uuidv4(),
      dto.legalPerson,
      dto.document,
      dto.name,
      dto.city,
      dto.state,
      dto.cep,
      `${dto.name} - ${dto.document}`,
      dto.polygon,
      dto.isHeadquarter,
      dto.isOrigin,
      dto.isDestiny,
      dto.isCarrier,
      dto.isActive ?? true,
      tags,
      new Date(),
      dto.latitude,
      dto.longitude
    );

    const createdPerson = await this.personRepository.create(person);
    return toPersonResponseDTO(createdPerson);
  }

  async updatePerson(
    id: string,
    dto: UpdatePersonDTO
  ): Promise<PersonResponseDTO> {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    let tags;

    if (dto.tagIds) {
      tags = await Promise.all(
        dto.tagIds.map(async (id) => {
          const obj = await this.tagRepository.findById(id);
          if (!obj) {
            throw new Errors.MoleculerClientError(
              'Registro não encontrado',
              404,
              'P2025'
            );
          }
          return obj;
        })
      );
    }

    const updatedPerson = await this.personRepository.update(person.id, {
      ...dto,
      updatedAt: new Date(),
    });

    return toPersonResponseDTO(updatedPerson);
  }

  async getPersonById(id: string): Promise<PersonResponseDTO> {
    const person = await this.personRepository.findById(id);

    if (!person)
      throw new Errors.MoleculerClientError('Registro não encontrado', 404);

    return toPersonResponseDTO(person);
  }

  async getAllPersons(): Promise<PersonResponseDTO[]> {
    const persons = await this.personRepository.getAll();
    return persons.map(toPersonResponseDTO);
  }
}
