// __tests__/app.test.ts
import request from 'supertest';
import app from '../src/app';

describe('POST /api/images/:id', () => {
  it('should upload images for a hotel', async () => {
    const response = await request(app)
      .post('/api/images/1')
      .field('id', '1')
      .attach('images', Buffer.from('dummy-image-data'), 'test-image.jpg')
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining({
      message: 'Images uploaded successfully',
      images: expect.arrayContaining([expect.stringContaining('/uploads/')])
    }));
  });
});
