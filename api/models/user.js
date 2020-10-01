const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    isActive: { type: Boolean, default: true },
    role: { type: String, required: true, default: 'standard' },
  },
  {
    id: false,
  },
);

userSchema.pre('save', function hashPassword() {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  }
});

userSchema.method('comparePassword', function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
