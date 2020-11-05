const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true, default: "standard" },
    validated: { type: Boolean, default: false },
  },
  {
    id: false,
  }
);

userSchema.pre("save", function hashPassword() {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  }
});

userSchema.pre("updateOne", function hashPassword() {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(
      this._update.password,
      SALT_WORK_FACTOR
    );
});

userSchema.method("comparePassword", function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
