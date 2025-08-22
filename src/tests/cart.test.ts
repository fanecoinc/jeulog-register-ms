import { Cart } from '@/domain/entities/Cart';
import broker from '@/infrastructure/broker/service-broker';
import { prismaClient } from '@/infrastructure/database';

describe('Cart Service E2E Tests', () => {
  beforeAll(async () => {
    await broker.start();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await broker.stop();
    await prismaClient.$disconnect();
  });

  it('should retrieve all carts', async () => {
    const carts: Cart[] = await broker.call('register.getCarts');
    expect(carts).toBeInstanceOf(Array);
  });

  it('should create a new cart', async () => {
    const cartData = {
      plate: 'ABC-1234',
      isActive: true,
    };

    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );

    expect(createdCart.plate).toBe(cartData.plate);
    expect(createdCart.isActive).toBe(cartData.isActive);
  });

  it('should find a cart by ID', async () => {
    const cartData = {
      plate: 'XYZ-5678',
      isActive: true,
    };
    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );
    const foundCart: Cart = await broker.call('register.getCartById', {
      id: createdCart.id,
    });
    expect(foundCart).toBeDefined();
    expect(foundCart.id).toBe(createdCart.id);
    expect(foundCart.plate).toBe(cartData.plate);
  });

  it('should edit an existing cart', async () => {
    const cartData = {
      plate: 'EDT-1234',
      isActive: true,
    };

    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );

    const updatedData = {
      id: createdCart.id,
      plate: 'UPD-5678',
      isActive: false,
    };

    const updatedCart: Cart = await broker.call(
      'register.editCart',
      updatedData
    );

    expect(updatedCart.id).toBe(createdCart.id);
    expect(updatedCart.plate).toBe(updatedData.plate);
    expect(updatedCart.isActive).toBe(updatedData.isActive);
  });
});
