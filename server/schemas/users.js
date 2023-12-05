import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    // Add more options if nee00ded
  },
  avatar: {
    type: String,
  },
  domain: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model('User', userSchema, 'heliverse');
export default User;