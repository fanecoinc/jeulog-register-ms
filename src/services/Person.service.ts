import { PersonUseCase } from '@/application/useCases/Person.use-case';
import {
  CreatePersonDTO,
  PersonResponseDTO,
  UpdatePersonDTO,
} from '@/application/dtos/Person.dto';
import { IPersonRepository } from '@/domain/ports/Person.repository';
import { ITagRepository } from '@/domain/ports/Tag.repository';

export class PersonService {
  private personUseCase: PersonUseCase;

  constructor(
    private personRepository: IPersonRepository,
    private tagRepository: ITagRepository
  ) {
    this.personUseCase = new PersonUseCase(
      this.personRepository,
      this.tagRepository
    );
  }

  async getAllPersons(): Promise<PersonResponseDTO[]> {
    return await this.personUseCase.getAllPersons();
  }

  async getPersonById(id: string): Promise<PersonResponseDTO> {
    return await this.personUseCase.getPersonById(id);
  }

  async createPerson(dto: CreatePersonDTO): Promise<PersonResponseDTO> {
    return await this.personUseCase.createPerson(dto);
  }

  async editPerson(
    id: string,
    dto: UpdatePersonDTO
  ): Promise<PersonResponseDTO> {
    return await this.personUseCase.updatePerson(id, dto);
  }
}
