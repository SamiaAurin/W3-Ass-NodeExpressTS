import { Router } from 'express';
import { createHotel, getHotelByIdOrSlug, updateHotelById  } from '../controllers/hotelController';

const router = Router();

// POST /hotel - Create a new hotel
router.post('/hotel', createHotel);

// GET /hotel/:idOrSlug - Retrieve a hotel by its unique ID or slug
router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);

// Add the PUT route to update hotel data
router.put('/hotel/:id', updateHotelById); 
export default router;