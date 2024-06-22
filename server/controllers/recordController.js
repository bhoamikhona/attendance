import asyncHandler from "../middlewares/asyncHandler.js";
import Record from "../models/recordModel.js";
import User from "../models/userModel.js";

export const addRecord = asyncHandler(async function (req, res) {
  const { email, time, date } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
    throw new Error("User not found");
  }

  const existingRecord = await Record.findOne({ user: user._id, date });

  if (existingRecord) {
    res.status(400).json({
      success: false,
      message: "Record for this date already exists",
      data: null,
    });
    throw new Error("Record for this date already exists");
  }

  const record = await Record.create({
    signin: time,
    signout: "N/A",
    date: date,
    user: user._id,
  });

  user.isSignedIn = true;
  user.records.push(record._id);
  await user.save();

  if (record) {
    res.status(201).json({
      success: true,
      message: "Sign In Successful",
      data: record,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Could not sign in",
      data: null,
    });
    throw new Error("Could not sign in");
  }
});

export const updateRecord = asyncHandler(async function (req, res) {
  const { email, time, date } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
    throw new Error("User not found");
  }

  const record = await Record.findOne({ user: user._id, date });

  if (!record) {
    res.status(404).json({
      success: false,
      message: "No record found for today",
      data: null,
    });
    throw new Error("No record found for today");
  }

  record.signout = time;
  await record.save();

  user.isSignedIn = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Sign Out Successful",
    data: record,
  });
});

export const getUserRecords = asyncHandler(async function (req, res) {
  const { email } = req.query;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
    throw new Error("User not found");
  }

  const records = await Record.find({ user: user._id });

  if (!records.length) {
    res.status(404).json({
      success: false,
      message: "No records found",
      data: null,
    });
    throw new Error("No records found");
  }

  res.status(200).json({
    success: true,
    data: records,
  });
});
