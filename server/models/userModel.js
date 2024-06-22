import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isSignedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
  records: {
    type: [Schema.Types.ObjectId],
    ref: "Record",
    default: [],
    required: true,
  },
});

const User = model("User", userSchema);
export default User;
