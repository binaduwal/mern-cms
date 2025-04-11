const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = 'mongodb://localhost:27017/sysqube';

    await mongoose.connect(dbURI);

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
}
};

module.exports = connectDB;
