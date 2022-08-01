const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewURLParser: true,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err.message);
    // Exit process if failed
    process.exit(1);
  }
};

module.exports = connectDB;

// MERN DEV CONNECTOR CLUSTER CONNECTION DETAILS
// Username: prasanna
// password:  h6yhJiw77FoYhAJG
