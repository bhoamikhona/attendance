import { Schema, model } from "mongoose";

const recordSchema = new Schema({
  signin: {
    type: String,
    required: true,
    default: "Absent",
  },
  signout: {
    type: String,
    required: true,
    default: "Absent",
  },
  date: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Record = model("Record", recordSchema);
export default Record;
