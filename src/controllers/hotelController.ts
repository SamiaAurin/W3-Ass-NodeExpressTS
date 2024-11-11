import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

const dataPath = path.resolve(__dirname, '../data');  // Using path.resolve

interface Hotel {
  id: string;
  slug: string;
  title: string;
  description: string;
  images?: string[];
  guestCount: number;
  bedroomCount: number;
  bathroomCount: number;
  amenities: string[];
  host: string;
  address: string;
  latitude: number;
  longitude: number;
  rooms: Array<{
    slug: string;
    image: string;
    title: string;
    bedroomCount: number;
  }>;
}

export const createHotel = (req: Request, res: Response): void => {
  console.log("POST /hotel endpoint hit");
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

  const { title, description, guestCount, bedroomCount, bathroomCount, amenities, host, address, latitude, longitude, rooms } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const id = new Date().getTime().toString();
  const slug = slugify(title, { lower: true });

  const newHotel: Hotel = {
    id,
    slug,
    title,
    description,
    guestCount,
    bedroomCount,
    bathroomCount,
    amenities,
    host,
    address,
    latitude,
    longitude,
    rooms: rooms || []
  };

  // Ensure the data directory exists
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }

  // Debugging to ensure file write path
  console.log("Data path:", dataPath);

  try {
    // Write the hotel data to a new file in the data folder
    fs.writeFileSync(`${dataPath}/${id}.json`, JSON.stringify(newHotel, null, 2));
    console.log(`Hotel data saved at ${dataPath}/${id}.json`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }

  res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
};


// GET by hotelID or Slug
// Helper function to get the file path for the hotel by its ID or slug
const getHotelFilePath = (idOrSlug: string) => {
  const filePath = path.join(dataPath, `${idOrSlug}.json`);
  return filePath;
};

// GET /hotel/:id - Retrieve a hotel by its ID or slug
export const getHotelById = (req: Request, res: Response): void => {
  const { id } = req.params; // Get the hotel ID or slug from the request params
  const filePath = getHotelFilePath(id);

  //if (!fs.existsSync(filePath)) {
    // If the file does not exist, return an error response
   // return res.status(404).json({ message: 'Hotel not found' });
  //}

  try {
    // Read the hotel file data
    const hotelData = fs.readFileSync(filePath, 'utf-8');
    const hotel = JSON.parse(hotelData);

    // If you need to add fully functional image URLs (assuming images are relative paths)
    const baseUrl = 'http://localhost:3002'; // Assuming your server is running on port 3002

    //if (hotel.images) {
     // hotel.images = hotel.images.map((image: string) => `${baseUrl}/uploads/${image}`);
    //}

    // Return the hotel data
    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error reading hotel data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};