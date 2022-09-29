const mongoose = require('mongoose');

async function connectDb() {
  const URI = process.env.MONGODB_URI;
  try {
    mongoose.connect(URI);
    console.log('[SUCCESS]: Connected to MongoDB!!');
  } catch (error) {
    console.error('[ERROR]: Error connecting to MongoDB', error);
    process.exit(1);
  }
}

module.exports = connectDb;
