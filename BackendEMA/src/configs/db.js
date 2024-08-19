const mongoose = require('mongoose');

const connectToDB = async (uri) => {
   try {
      await mongoose.connect(uri);
      console.log('Successfully connected to the database');
   } catch (error) {
      console.log("Error:", error.message);
   }
}

module.exports = connectToDB;
