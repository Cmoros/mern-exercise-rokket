import mongoose from "mongoose";
import userSchema from "./UserSchema"; 

const UserModel = mongoose.model("user", userSchema);

