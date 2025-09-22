const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/userRoutes'));  // renamed to userRoutes
app.use('/api/activities', require('./Routes/activityRoutes'));

// Test Route
app.get('/', (req, res) => {
    res.json({ message: "Server is running" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
