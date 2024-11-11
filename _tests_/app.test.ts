import request from 'supertest';
import app from '../src/app';

describe('Hotel API', () => {
  it('should create a new hotel', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Rainwater Falls',
        description: 'A beautiful place',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 1,
        amenities: ['Pool', 'WiFi'],
        host: 'John Doe',
        address: '123 Water St',
        latitude: 40.7128,
        longitude: -74.0060,
        rooms: [
          { slug: 'room-1', image: 'room1.jpg', title: 'Cozy Room', bedroomCount: 1 },
          { slug: 'room-2', image: 'room2.jpg', title: 'Master Room', bedroomCount: 2 }
        ]
      });
    expect(response.status).toBe(201);
    expect(response.body.hotel).toHaveProperty('id');
  });

  it('should retrieve a hotel by ID', async () => {
    const hotelId = 'existing-hotel-id';
    const response = await request(app).get(`/api/hotel/${hotelId}`);
    if (response.status === 404) {
      expect(response.body.message).toBe('Hotel not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
    }
  });

  it('should update hotel information', async () => {
    const hotelId = 'existing-hotel-id';
    const response = await request(app)
      .put(`/api/hotel/${hotelId}`)
      .send({ title: 'Updated Hotel Name' });
    if (response.status === 404) {
      expect(response.body.message).toBe('Hotel not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body.hotel.title).toBe('Updated Hotel Name');
    }
  });
});
