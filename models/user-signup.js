const mongoose = require("mongoose");
const { Schema } = mongoose;
const Address = require('./address');

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const UserSignUpSchema = new Schema({
  customer_id: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: Address,
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: Date,
  updated_at: Date,
}, schemaOptions);

const UserSignup = mongoose.model("Users", UserSignUpSchema);
module.exports = UserSignup;
