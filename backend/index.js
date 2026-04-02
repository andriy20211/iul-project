require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 3111;

if (!mongoURI) {
    console.error("Error: MONGO_URI not found in .env file");
    process.exit(1);
}

// Database Connection
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Database connection error:", err));

// User Schema Definition
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Added this line
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// REGISTRATION
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password }); // Save name to DB
        await newUser.save();
        
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Find the user by email and password
        const user = await User.findOne({ email, password });
        
        if (user) {
            // 2. Send the name from the database back to React
            res.json({ 
                message: "Login successful!",
                user: { 
                    name: user.name,  // <--- This comes from your DB field
                    email: user.email 
                } 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Mongoose command to get everything
        res.json(users); // Send the data to the browser as JSON
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

app.get('/', (req, res) => {
    res.send('API Server is running. Use /api/register or /api/login to interact.');
});