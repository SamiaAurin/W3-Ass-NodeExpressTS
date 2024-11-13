# Hotel Management API

## Project Setup

To get started with this project, follow the steps below:

### 1. Clone the Repository
Begin by cloning this repository to your local machine using the following command:
First, clone this repository to your local machine by running the following command in your terminal:

```bash
git clone [<repository-url>](https://github.com/SamiaAurin/W3-Ass-NodeExpressTS.git)
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
npx tsc --version|
```
>>To start the server, run the following command:
```bash
npm start
```
>> This will launch the server, and it will be accessible at http://localhost:3002.
>>To ensure that everything is working as expected, run the unit tests using the following command:
```bash
npm test
```

### 2. Project Structure
---| hotel-management-api (Root Folder)
     ---| __tests__
            ---| app.test.ts                # Test file for API routes
     ---| node_modules                      # Node.js modules
     ---| src
            ---| controllers
                   ---| hotelController.ts # Logic for hotel-related endpoints
             ---| data
                  ---| hotel-id.json       # JSON file storing hotel data
            ---| middleware
                  ---| validation.ts       # Validation middleware for requests
            ---| routes
                  ---| hotelRoutes.ts      # Defines routes for hotel API endpoints
            ---| uploads
                  ---| rooms               # Directory for room images
                  ---| hotel               # Directory for hotel images
       ---| app.ts                          # Main application setup and routing
       ---| jest.config.ts                 # Jest configuration file
       ---| package.json                   # Project dependencies and scripts
       ---| tsconfig.json                  # TypeScript configuration file

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


