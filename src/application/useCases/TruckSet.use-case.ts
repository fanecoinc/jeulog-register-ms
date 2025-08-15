import { ITruckTractorRepository } from '@/domain/ports/TruckTractor.repository';
import { IPersonRepository } from '@/domain/ports/Person.repository';
import { ICartRepository } from '@/domain/ports/Cart.repository';
import { ITruckSetRepository } from '@/domain/ports/TruckSet.repository';
import {
  CreateTruckSetDTO,
  UpdateTruckSetDTO,
  TruckSetResponseDTO,
  toTruckSetResponseDTO,
} from '../dtos/TruckSet.dto';
import { TruckSet } from '@/domain/entities/TruckSet';
import { v4 as uuidv4 } from 'uuid';
import { Errors } from 'moleculer';
import { TruckSetStatus } from '@/domain/enums/TruckSetStatus';

export class TruckSetUseCase {
  constructor(
    private readonly truckSetRepository: ITruckSetRepository,
    private readonly truckTractorRepository: ITruckTractorRepository,
    private readonly personRepository: IPersonRepository,
    private readonly cartRepository: ICartRepository
  ) {}

  private async dtoInternalValidation(
    dto: CreateTruckSetDTO | UpdateTruckSetDTO,
    truckSetId?: string
  ): Promise<Record<string, any>> {
    const [person, truckTractor, cartOne, cartTwo, cartThree] =
      await Promise.all([
        dto.ownerId ? this.personRepository.findById(dto.ownerId) : null,
        dto.truckTractorId
          ? this.truckTractorRepository.findById(dto.truckTractorId)
          : null,
        dto.cartOneId ? this.cartRepository.findById(dto.cartOneId) : null,
        dto.cartTwoId ? this.cartRepository.findById(dto.cartTwoId) : null,
        dto.cartThreeId ? this.cartRepository.findById(dto.cartThreeId) : null,
      ]);
    // Validação do proprietário
    if (!person)
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    if (!person.isCarrier)
      throw new Errors.MoleculerClientError(
        'Proprietário do conjunto deve ser uma transportadora',
        400,
        'ValidationError'
      );

    // Validação do cavalo mecânico (TruckTractor)
    if (!truckTractor)
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    if (!truckTractor.isActive)
      throw new Errors.MoleculerClientError(
        'Cavalo inativo',
        400,
        'ValidationError'
      );
    if (
      truckTractor.isTruck &&
      (dto.cartOneId || dto.cartTwoId || dto.cartThreeId)
    ) {
      throw new Errors.MoleculerClientError(
        'O Cavalo selecionado é do tipo "Truck" e não deve conter carretas',
        400,
        'ValidationError'
      );
    }
    if (
      !truckTractor.isTruck &&
      !dto.cartOneId &&
      !dto.cartTwoId &&
      !dto.cartThreeId
    ) {
      throw new Errors.MoleculerClientError(
        'O Cavalo selecionado não é do tipo "Truck" e deve conter pelo menos uma carreta',
        400,
        'ValidationError'
      );
    }

    // Validação das carretas (se existirem)
    [cartOne, cartTwo, cartThree].forEach((cart, index) => {
      if (cart === null) return;

      if (!cart)
        throw new Errors.MoleculerClientError(
          `Registro não encontrado para Carreta ${index + 1}`,
          404,
          'P2025'
        );
      if (!cart.isActive)
        throw new Errors.MoleculerClientError(
          `Carreta ${index + 1} inativa`,
          400,
          'ValidationError'
        );
    });
    // Verifica se o cavalo mecânico já está associado a outro conjunto
    if (truckSetId) {
      const existingTruckSet =
        await this.truckSetRepository.findByTruckTractorId(truckTractor.id);
      if (existingTruckSet && existingTruckSet.id !== truckSetId) {
        throw new Errors.MoleculerClientError(
          'Cavalo mecânico já está associado a outro conjunto',
          400,
          'ValidationError'
        );
      }
    } else {
      const existingTruckSet =
        await this.truckSetRepository.findByTruckTractorId(truckTractor.id);
      if (existingTruckSet) {
        throw new Errors.MoleculerClientError(
          'Cavalo mecânico já está associado a outro conjunto',
          400,
          'ValidationError'
        );
      }
    }

    // Verifica se as carretas já estão associadas a outro conjunto usando
    if (truckSetId) {
      const existingCartOne = cartOne
        ? await this.truckSetRepository.findByCartId(cartOne.id)
        : null;
      const existingCartTwo = cartTwo
        ? await this.truckSetRepository.findByCartId(cartTwo.id)
        : null;
      const existingCartThree = cartThree
        ? await this.truckSetRepository.findByCartId(cartThree.id)
        : null;
      if (
        (existingCartOne && existingCartOne.id !== truckSetId) ||
        (existingCartTwo && existingCartTwo.id !== truckSetId) ||
        (existingCartThree && existingCartThree.id !== truckSetId)
      ) {
        throw new Errors.MoleculerClientError(
          'Uma ou mais carretas já estão associadas a outro conjunto',
          400,
          'ValidationError'
        );
      }
    } else {
      const existingCartOne = cartOne
        ? await this.truckSetRepository.findByCartId(cartOne.id)
        : null;
      const existingCartTwo = cartTwo
        ? await this.truckSetRepository.findByCartId(cartTwo.id)
        : null;
      const existingCartThree = cartThree
        ? await this.truckSetRepository.findByCartId(cartThree.id)
        : null;
      if (existingCartOne || existingCartTwo || existingCartThree) {
        throw new Errors.MoleculerClientError(
          'Uma ou mais carretas já estão associadas a outro conjunto',
          400,
          'ValidationError'
        );
      }
    }

    return {
      truckTractor: truckTractor,
      owner: person,
      cartOne: cartOne ?? null,
      cartTwo: cartTwo ?? null,
      cartThree: cartThree ?? null,
    };
  }

  // TODO: bug para aceitar carts
  async createTruckSet(dto: CreateTruckSetDTO): Promise<TruckSetResponseDTO> {
    const { truckTractor, owner, cartOne, cartTwo, cartThree } =
      await this.dtoInternalValidation(dto);

    const truckSet = new TruckSet(
      uuidv4(),
      TruckSetStatus.AVAILABLE,
      dto.dedicatedFleet,
      truckTractor,
      owner,
      new Date(),
      dto.truckTractorId,
      dto.ownerId,
      dto.blockedDescription,
      cartOne,
      cartTwo,
      cartThree
    );

    const createdTruckSet = await this.truckSetRepository.create(truckSet);
    return toTruckSetResponseDTO(createdTruckSet);
  }

  async updateTruckSet(
    id: string,
    dto: UpdateTruckSetDTO
  ): Promise<TruckSetResponseDTO> {
    const truckSet = await this.truckSetRepository.findById(id);

    if (!truckSet)
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );

    await this.dtoInternalValidation(dto, truckSet.id);

    const updatedTruckSet = await this.truckSetRepository.update(truckSet.id, {
      ...dto,
      updatedAt: new Date(),
    });

    return toTruckSetResponseDTO(updatedTruckSet);
  }

  async getTruckSetById(id: string): Promise<TruckSetResponseDTO> {
    const truckSet = await this.truckSetRepository.findById(id);
    if (!truckSet)
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    return toTruckSetResponseDTO(truckSet);
  }

  async getAllTruckSets(): Promise<TruckSetResponseDTO[]> {
    const truckSets = await this.truckSetRepository.getAll();
    return truckSets.map(toTruckSetResponseDTO);
  }

  async deleteTruckSet(id: string): Promise<null> {
    const truckSet = await this.truckSetRepository.findById(id);
    if (!truckSet)
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );

    await this.truckSetRepository.delete(truckSet.id);
    return null;
  }
}
