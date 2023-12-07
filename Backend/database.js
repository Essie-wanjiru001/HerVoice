const mongoose = require('mongoose');

const databaseName = 'HerVoice';

mongoose.connect(`mongodb+srv://essie-001:Essiewanjiru001**@hervoice.sel1nvo.mongodb.net/${databaseName}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: String,
  phoneNumber: { type: String, match: /^\d{10}$/ },
  about: String,
  timestamp: { type: Date, default: Date.now },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

async function saveUserProfile(userProfile) {
  try {
    const newUserProfile = new UserProfile(userProfile);
    await newUserProfile.save();
    console.log('User profile saved successfully!');
  } catch (error) {
    if (error.code === 11000) {
      console.error('Duplicate key error:', error);
    } else {
      console.error('Error saving user profile:', error);
    }
    throw error;
  }
}

module.exports = {
  saveUserProfile,
};

