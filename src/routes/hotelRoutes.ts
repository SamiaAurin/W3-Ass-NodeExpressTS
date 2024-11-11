import { Router } from 'express';
import { createHotel, getHotelById } from '../controllers/hotelController';

const router = Router();

router.post('/hotel', createHotel);
// Define the GET /hotel/:id or /hotel/:slug route
router.get('/hotel/:id', getHotelById);
export default router;
