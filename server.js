const express = require('express');
const app = express();
const connectDB = require("./config/db")
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8000;
connectDB();
app.use(express.json());

app.use('/api/auth', require("./Routes/authRoute"));

app.get('/', (req, res) => {
    res.json({ message: "server is running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})