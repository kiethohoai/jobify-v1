import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 20,
    default: 'lastName',
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: `Please provide a valid email`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: 'my city',
  },
});

// Hash Password with Pre Middleware
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', UserSchema);
