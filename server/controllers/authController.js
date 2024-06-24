import User from "../models/userModel.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const register = asyncHandler(async function (req, res) {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      success: false,
      message: "User already exists",
      data: null,
    });
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSignedIn: user.isSignedIn,
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user data",
      data: null,
    });
    throw new Error("Invalid user data");
  }
});

export const login = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === "" || password === "") {
    res.status(401).json({
      success: false,
      message: "All fields are required",
      data: null,
    });
    throw new Error("All fields are required");
  }

  if (!user) {
    res.status(401).json({
      success: false,
      message: "No user found, please register",
      data: null,
    });
    throw new Error("No user found, please register");
  }

  if (user && (await comparePassword(password, user.password))) {
    generateToken(res, user._id);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSignedIn: user.isSignedIn,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
    throw new Error("Invalid email or password");
  }
});

export const logout = function (req, res) {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    data: null,
  });
};

export const getUser = asyncHandler(async function (req, res) {
  const { id } = req.params;

  const user = User.findById(id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSignedIn: user.isSignedIn,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getAllUsers = asyncHandler(async function (req, res) {
  const users = await User.find({});

  if (!users || users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found",
      data: null,
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  }
});
