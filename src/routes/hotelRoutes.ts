import { Router } from 'express';
import multer from 'multer';
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
    const folder = req.params.roomSlug ? 'rooms' : ''; // Use 'rooms' folder if URL has /images/:id/:roomSlug
    const destinationPath = path.join(__dirname, `../uploads/${folder}`);

    // Ensure the directory exists
    fs.mkdirSync(destinationPath, { recursive: true });

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const hotelId = req.params.id || req.body.id;
    const roomSlug = req.params.roomSlug;

    if (!hotelId) {
      return cb(new Error('Hotel ID is required'), '');
    }

    const extension = path.extname(file.originalname);
    const originalName = path.basename(file.originalname, extension);

    // Add roomSlug to the filename if it's a room image
    const filename = roomSlug
      ? `${hotelId}-${roomSlug}-${originalName}${extension}`
      : `${hotelId}-${originalName}${extension}`;

    cb(null, filename);
  }
});

// Initialize the upload middleware
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
});

// Routes
// Upload hotel images
router.post('/images/:id', upload.array('images', 10), uploadImages); 
// Upload room images
router.post('/images/:id/:roomSlug', upload.array('images', 10), uploadRoomImages); 

// Upload hotel informations
router.post('/hotel', createHotel);

// Retreive hotel informations
router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);

// Update hotel informations
router.put('/hotel/:id', updateHotelById); 

export default router;
