const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create a UserProfile schema and model
const userProfileSchema = new mongoose.Schema({
    fullName: String,
    dob: Date,
    address: String,
    phoneNumber: String,
    about: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Save user profile function
async function saveUserProfile(userProfile) {
    try {
        // Create a new UserProfile instance
        const newUserProfile = new UserProfile(userProfile);
        
        // Save the user profile to the database
        await newUserProfile.save();

        console.log('User profile saved successfully!');
    } catch (error) {
        console.error('Error saving user profile:', error);
        throw error; // Re-throw the error for handling in the calling code (profile.html)
    }
}

module.exports = {
    saveUserProfile,
};

