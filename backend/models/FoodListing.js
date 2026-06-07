const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: "plates" },
  expiryDate: { type: Date, required: true },
  imageUrl: { type: String },
  location: { type: String, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: "available" },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodListing', foodSchema);