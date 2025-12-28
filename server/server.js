const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const ebookRoutes = require('./routes/ebookRoutes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api/users', userRoutes);
app.use('/api/ebooks', ebookRoutes);
