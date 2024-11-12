import { Router } from 'express';
import multer from 'multer'; // Import multer
import { createHotel, getHotelByIdOrSlug, updateHotelById, uploadImages, uploadRoomImages } from '../controllers/hotelController';
import path from 'path';
import fs from 'fs';

const router = Router();

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const hotelId = req.params.id || req.body.id;
      if (!hotelId) {
        return cb(new Error('Hotel ID is required'), '');
      }
      
      // Define the destination folder based on route
      const folder = req.params.id ? 'rooms' : ''; // Use 'rooms' folder if URL has /images/:id
      const destinationPath = path.join(__dirname, `../uploads/${folder}`);
  
      // Ensure the directory exists
      fs.mkdirSync(destinationPath, { recursive: true });
  
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const hotelId = req.params.id || req.body.id;
      if (!hotelId) {
        return cb(new Error('Hotel ID is required'), '');
      }
  
      const extension = path.extname(file.originalname);
      const originalName = path.basename(file.originalname, extension);
      const filename = `${hotelId}-${originalName}${extension}`;
      cb(null, filename);
    }
  });
  
  // Initialize the upload middleware
  const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
  });
// Add route for handling image uploads
router.post('/images', upload.array('images', 10), uploadImages);

// Add route for room images
router.post('/images/:id/:roomSlug', upload.array('images', 10), uploadRoomImages);

// POST /hotel - Create a new hotel
router.post('/hotel', createHotel);

// GET /hotel/:idOrSlug - Retrieve a hotel by its unique ID or slug
router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);

// Add the PUT route to update hotel data
router.put('/hotel/:id', updateHotelById); 
export default router;
