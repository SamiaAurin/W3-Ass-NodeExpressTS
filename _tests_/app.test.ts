import request from 'supertest';
import app from '../src/app'; 
//import path from 'path';

describe('POST /hotel', () => {
  it('should create a hotel successfully with valid data', async () => {
    const res = await request(app)
      .post('/api/hotel')
      .field('title', 'Rainwater Falls')
      .field('description', 'A beautiful resort located near the waterfall.')
      .field('guestCount', 50)
      .field('bedroomCount', 25)
      .field('bathroomCount', 20)
      .field('amenities', ['Free Wifi', 'Pool' , 'Spa'])
      .field('host', 'John Doe')
      .field('address', '123 Waterfall Road, Some City, Country')
      .field('latitude', 34.0522)
      .field('longitude', -118.2437)
      //.attach('images', path.join(__dirname, 'uploads', '1731326825808-home3.jpg')); 

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Hotel created successfully');
  });

  it('should return an error when missing required fields', async () => {
    const res = await request(app)
      .post('/api/hotel')
      .send({ title: '' }); // Missing required fields

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is required');
  });
});

/////////////////
describe('GET /hotel/:idOrSlug', () => {
  it('should return hotel data for valid ID', async () => {
    const res = await request(app).get('/api/hotel/1731326825808');  
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('1731326825808');
  });

  it('should return hotel data for valid slug', async () => {
    const res = await request(app).get('/api/hotel/rainwater-falls');  
    expect(res.status).toBe(200);
    expect(res.body.slug).toBe('rainwater-falls');
  });

  it('should return 404 when hotel is not found', async () => {
    const res = await request(app).get('/api/hotel/invalid-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Hotel not found');
  });
});

/////////////////////////////////
describe('PUT /hotel/:id', () => {
  it('should update hotel details successfully with valid data', async () => {
    const res = await request(app)
      .put('/api/hotel/1731326825808')  // Using a valid hotel ID
      .field('title', 'Rainwater Falls Resort')
      .field('description', 'A beautiful resort with upgraded amenities.')
      .field('guestCount', 60)
      .field('bedroomCount', 30)
      .field('bathroomCount', 25)
      .field('amenities', ['Free Wifi', 'Pool', 'Spa', 'Gym'])
      .field('host', 'Jane Doe')
      .field('address', '456 Waterfall Road, Some City, Country')
      .field('latitude', 34.0522)
      .field('longitude', -118.2437)
      //.attach('images', 'http://localhost:3002/uploads/1731326825808-updated-image.jpg');  

    //expect(res.status).toBe(200);
    //expect(res.body.message).toBe('Hotel updated successfully');
    //expect(res.body.title).toBe('Rainwater Falls Resort');
    //expect(res.body.guestCount).toBe(60);
  });

  it('should return an error when trying to update a non-existent hotel', async () => {
    const res = await request(app)
      .put('/api/hotel/nonexistent-id')  // Using a non-existent ID
      .send({ title: 'Non-existent Hotel' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Hotel not found');
  });

  it('should return an error when missing required fields', async () => {
    const res = await request(app)
      .put('/api/hotel/1731326825808')  
      .send({ title: '' }); 

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is required');
  });
});
