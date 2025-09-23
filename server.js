const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/userRoutes'));
app.use('/api/activities', require('./Routes/activityRoutes'));

// Health check route
app.get('/', (req, res) => {
    res.json({ message: "✅ Server is running" });
});

app.use('/api/googlefit', require('./Routes/googleFitRoutes'));


// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
