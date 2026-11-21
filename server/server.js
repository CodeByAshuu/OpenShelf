const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const ebookRoutes = require('./routes/ebookRoutes');
const path = require('path');

// Serve static files (local uploads – profile images not yet on Cloudinary)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Health check endpoint (used by Docker health checks)
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/users', userRoutes);
app.use('/api/ebooks', ebookRoutes);

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
