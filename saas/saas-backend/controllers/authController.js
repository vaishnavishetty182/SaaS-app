import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Organization from '../models/Organization.js';
import bcrypt from 'bcryptjs';

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      organization: user.organization
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Complete login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        field: !email ? 'email' : 'password'
      });
    }

    // Find user with password and organization populated
    const user = await User.findOne({ email })
      .select('+password')
      .populate('organization');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user);

    // Prepare user data for response
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Complete registration controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'user', orgName } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
        missingFields: {
          name: !name,
          email: !email,
          password: !password
        }
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
        conflictField: 'email'
      });
    }

    // Handle organization for admins
    let organization = null;
    if (role === 'admin' && orgName) {
      const existingOrg = await Organization.findOne({ name: orgName });
      if (existingOrg) {
        return res.status(409).json({
          success: false,
          message: 'Organization name already taken'
        });
      }

      organization = await Organization.create({
        name: orgName,
        createdBy: name
      });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organization: organization?._id
    });

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        organization: organization || null
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already in use`,
        conflictField: field
      });
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Password reset controller
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Implementation would typically:
    // 1. Find user by email
    // 2. Generate reset token
    // 3. Send email with reset link
    // 4. Return success response
    
    res.json({
      success: true,
      message: 'If an account exists with this email, a reset link has been sent'
    });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({
      success: false,
      message: 'Error processing password reset'
    });
  }
};

export { 
  loginUser, 
  registerUser, 
  requestPasswordReset 
};