# Hotel Management API

## Technologies to Use

The following technologies are used to build and run this project:

- **Node.js**
- **Express.js framework**
- **TypeScript**

## Project Setup

To get started with this project, follow the steps below:

### 1. Clone the Repository
Begin by cloning this repository to your local machine using the following command:
First, clone this repository to your local machine by running the following command in your terminal:

```bash
git clone https://github.com/SamiaAurin/W3-Ass-NodeExpressTS.git
```
>> Once cloned, navigate into the project directory: 
```bash
cd hotel-management-api
```
>> Next, install all required dependencies using npm:
```bash
npm install
```
>> Make sure that TypeScript is installed globally on your system. 
>> If you don\'t have it installed, run the following command to install it globally:
```bash
npm install -g typescript
npx tsc --version
```
>>To start the server, run the following command:
```bash
npm run dev
```
>> This will launch the server, and it will be accessible at http://localhost:3002.
>>To ensure that everything is working as expected, run the unit tests using the following command:
```bash
npm test
```

### 2. Project Structure

- **hotel-management-api (Root Folder)**
  - **`__tests__`**: Unit tests for the API
    - `app.test.ts`: Test file for API routes
  - **`node_modules`**: Node.js modules (generated after running `npm install`)
  - **`src`**:
    - **`controllers`**: Logic for handling hotel-related endpoints
      - `hotelController.ts`: Controller for managing hotel data
    - **`data`**: Folder storing hotel data files
      - `hotel-id.json`: JSON file with hotel data
    - **`middleware`**: Middleware functions for request validation and other tasks
      - `validation.ts`: Middleware for validating request data
    - **`routes`**: Folder for defining API routes
      - `hotelRoutes.ts`: Routes for the hotel API endpoints
    - **`uploads`**: Folder for storing image uploads
      - `rooms`: Directory for storing room images
      -  storing hotel images
    - `app.ts`: Main application setup and routing
  - `jest.config.ts`: Jest configuration file
  - `package.json`: Project dependencies and npm scripts
  - `tsconfig.json`: TypeScript configuration file

### API and Server

The Hotel Management API is built using Express.js and serves on [http://localhost:3002](http://localhost:3002) by default.

- The application listens on port `3002` (or another port if configured differently).
- It serves static files from the `uploads` directory. 

### API Routes

The Hotel Management API includes the following core routes in src/app.ts:

- **POST /api/hotel**: Create a new hotel with hotel's image uploads.
  - Request body should include hotel details in JSON format, including images.
  - In Postman Make a request using POST method http://localhost:3002/api/hotel/ and use form-data in Body.
  
- **POST /api/images/:id**: Upload images for a specific hotel.
  - This endpoint allows you to upload images related to a specific hotel identified by its `id`.
  - In Postman Make a request using POST method http://localhost:3002/api/images/hotel-id and use   form-data in Body.

- **POST /api/images/:id/:roomSlug**: Upload images for a specific room.
  - This endpoint is for uploading room-specific images. It requires both the hotel `id` and the room `slug`.
  - In Postman Make a request using POST method http://localhost:3002/api/images/hotel-id/room-slug and use form-data in Body.
  
- **GET /api/hotel/:idOrSlug**: Retrieve information for a hotel by its ID or slug.
  - This endpoint allows fetching hotel details, including room details and images, using either the hotel `id` or `slug`.
  - In Postman Make a request using GET method http://localhost:3002/api/hotel/hotel-id 

- **PUT /api/hotel/:id**: Update an existing hotel by its ID.
  - Use this endpoint to update hotel details such as title, description, amenities, etc., using the hotel `id`.
  - In Postman Make a request using PUT method http://localhost:3002/api/hotel/hotel-id 

These routes enable management of hotel records, including image handling for hotels and their rooms. All image URLs are made accessible via the `/uploads` directory.

## Schema for Posting a New Hotel

When posting a new hotel, the following information will be stored in the corresponding hotel JSON file located in `src/data/hotel-id.json`:

- **Hotel ID**: 
  - Auto-generated for uniqueness in `hotelController.ts`
- **Slug**: 
  - Generated using the `slugify` library (third-party)
- **Images**: 
  - List of image URLs associated with the hotel
- **Title**: 
  - The name/title of the hotel
- **Description**: 
  - A brief description of the hotel
- **Guest Count**: 
  - The number of guests the hotel can accommodate
- **Bedroom Count**: 
  - The number of bedrooms in the hotel
- **Bathroom Count**: 
  - The number of bathrooms in the hotel
- **Amenities**: 
  - List of amenities provided by the hotel (e.g., pool, gym, etc.)
- **Host Information**: 
  - Details about the host, such as name, contact info, etc.
- **Address**: 
  - The full address of the hotel
- **Latitude & Longitude**: 
  - Geographical coordinates of the hotel (in decimal format)
- **Room Information** (multiple rooms per hotel):
  - **Hotel Slug**: 
    - Unique slug for the hotel
  - **Room Slug**: 
    - Unique slug for each room in the hotel
  - **Room Image**: 
    - Image URL for the room (uploaded using `POST /api/images/:id/:roomSlug`)
  - **Room Title**: 
    - The title or name of the room
  - **Bedroom Count**: 
    - The number of bedrooms in the room

## Postman Collection

You can import the Postman collection for this project by following these steps:

### 1. Download the Postman Collection File
Download the `W3-Ass-03.postman_collection.json` file from the repository.

### 2. Import the Collection into Postman
1. Open Postman on your system.
2. Click on the **Import** button in the top-left corner of the Postman interface.
3. Select **Upload Files** and choose the `W3-Ass-03.postman_collection.json` file from your local machine.
4. After selecting the file, click **Open** to import the collection into Postman.

### 3. Use the Collection
Once imported, the collection will appear in the **Collections** tab in Postman. You can now use it to test the API endpoints.

## Project Screenshots

To help you visualize the process and results of using the API, the project includes several screenshots stored in the PostmanPics folder.  

![Post a new Hotel Image](./PostmanPics/PostHotel.png)