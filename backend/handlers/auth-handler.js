const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db/user');

const JWT_SECRET = 'your-secret-key-change-in-production';

// Register user
const register = async (email, password, name) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    // Create new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      isAdmin: false
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.isAdmin ? 'admin' : 'customer' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.isAdmin ? 'admin' : 'customer'
      }
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

// Login user
const login = async (email, password) => {
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.isAdmin ? 'admin' : 'customer' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.isAdmin ? 'admin' : 'customer'
      }
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { register, login };
