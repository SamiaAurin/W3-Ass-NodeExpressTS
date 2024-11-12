import express from 'express';
import hotelRoutes from './routes/hotelRoutes';
import path from 'path';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Use hotel routes
app.use('/api', hotelRoutes);


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const port = 3002; // Change to another port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;