// models/User.js
import mongoose from 'mongoose';

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

// Specify 'myusers' as the collection name
const User = mongoose.model('User', userSchema, 'Users');

export default User;
