const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
  title: String,
  description: String,
  downloadLink: String,
  uploadedBy: String,
  dateUploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ebook', ebookSchema);
