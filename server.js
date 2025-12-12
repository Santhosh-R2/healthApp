require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');

const app = express();

// --- Middleware ---
app.use(express.json()); // To parse JSON data
app.use(cors());         // To allow requests from other domains

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// --- Routes ---
// This mounts your routes at /api. Example: /api/register
app.use('/api', userRoutes);

// Root Route (Optional: helps you see if the server is alive on Vercel)
app.get('/', (req, res) => {
  res.send('Health App API is running successfully!');
});

// --- VERCEL & LOCAL SERVER SETUP ---

// 1. Export the 'app' for Vercel to use (Crucial step)
module.exports = app;

// 2. Start the server locally
// This condition ensures app.listen() runs ONLY when you run 'node server.js'
// Vercel skips this part so it doesn't crash
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}