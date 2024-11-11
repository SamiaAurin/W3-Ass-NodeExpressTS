import express from 'express';
import hotelRoutes from './routes/hotelRoutes';


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Use hotel routes
app.use('/api', hotelRoutes);

  
const port = 3002; // Change to another port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
