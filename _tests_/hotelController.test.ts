import { Request, Response } from 'express';
import { createHotel, getHotelByIdOrSlug } from '../src/controllers/hotelController';
import fs from 'fs';

jest.mock('fs');

describe('getHotelByIdOrSlug Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hotel data when a valid ID is provided', async () => {
    const req = {
      params: { idOrSlug: '1' },
    } as Partial<Request>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock fs.readFileSync to return valid hotel data
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify({
      id: '1',
      slug: 'test-hotel',
      title: 'Test Hotel',
    }));

    await getHotelByIdOrSlug(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      slug: 'test-hotel',
      title: 'Test Hotel',
    }));
  });
});
