const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const FoodListing = require('../models/FoodListing');
const User = require('../models/User');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

// Post Food
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const { title, description, quantity, unit, expiryDate, location } = req.body;

    const food = await FoodListing.create({
      title,
      description,
      quantity: Number(quantity),
      unit: unit || "plates",
      expiryDate: new Date(expiryDate),
      imageUrl,
      location: location || "Not Specified",
      donor: req.user.id
    });

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get Available Food + Auto Expiry Check
router.get('/', async (req, res) => {
  try {
    const now = new Date();

    // Auto expiry check on every request
    await FoodListing.updateMany(
      { 
        expiryDate: { $lt: now },
        status: 'available'
      },
      { status: 'expired' }
    );

    const foods = await FoodListing.find({ status: "available" })
      .populate('donor', 'name phone')
      .sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// My Listings
router.get('/my', protect, async (req, res) => {
  try {
    const foods = await FoodListing.find({ donor: req.user.id })
      .sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Claim Food
router.put('/claim/:id', protect, async (req, res) => {
  try {
    const food = await FoodListing.findById(req.params.id);

    if (!food) return res.status(404).json({ message: "Food not found" });
    if (food.status !== 'available') {
      return res.status(400).json({ message: "Food already claimed or expired" });
    }

    const donor = await User.findById(food.donor);

    food.status = 'claimed';
    food.claimedBy = req.user.id;
    await food.save();

    res.json({ 
      message: "Food claimed successfully!", 
      donorName: donor ? donor.name : "Not available",
      donorPhone: donor ? donor.phone : "Not available"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;