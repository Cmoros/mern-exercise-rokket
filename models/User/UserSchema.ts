import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
});


export default userSchema;