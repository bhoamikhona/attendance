import User from "../models/userModel.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
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

/**
 * @desc    Auth user & get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Public
export const logout = function (req, res) {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    data: null,
  });
};
