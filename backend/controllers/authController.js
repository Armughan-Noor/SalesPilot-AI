const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/response")


// Generate JWT
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "All fields are required",
    });
  }

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "User already exists",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate token
  const token = generateToken(user._id);

  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });

});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Email and password are required",
    });
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid credentials",
    });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid credentials",
    });
  }

  // Generate token
  const token = generateToken(user._id);

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });

});

module.exports = {
  register,
  login,
};