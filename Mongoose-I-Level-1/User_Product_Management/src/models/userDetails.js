const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true,  unique: true },
  age: { type: Number, min: 18 },
  password: { type: String, required: true },
  pan: { type: String, unique:true },
  profilePicture: { type: String, unique:true },
  city: { type: String, enum: ["Bangalore", "Kolkata", "Delhi"] },
},{versionKey:false});

const userModel = model("user", userSchema);
module.exports = userModel;
