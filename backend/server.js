const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cron = require('node-cron');
const FoodListing = require('./models/FoodListing');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ SurplusShare Backend is Working!'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/food', require('./routes/food'));

// Auto Expiry - Runs every 30 seconds for better testing
cron.schedule('*/30 * * * * *', async () => {
  try {
    const now = new Date();
    const result = await FoodListing.updateMany(
      { 
        expiryDate: { $lt: now },
        status: 'available'
      },
      { status: 'expired' }
    );
    
    if (result.modifiedCount > 0) {
      console.log(`✅ ${result.modifiedCount} foods automatically marked as expired at ${now}`);
    }
  } catch (error) {
    console.error("Auto Expiry Error:", error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));