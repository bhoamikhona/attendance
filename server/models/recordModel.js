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
});

const Record = model("Record", recordSchema);
export default Record;
