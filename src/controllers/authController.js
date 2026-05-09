const bcrypt = require("bcryptjs");
const User = require("../models/User");

const QRCode = require("qrcode");
const { generateSecret, generateURI, verify } = require("otplib");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email,
      passwordHash,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Basic validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }
  
      // Find user
      const user = await User.findOne({ email });
  
      // Prevent user enumeration attacks
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
      // Compare password with stored hash
      const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
      );
  
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          mfaEnabled: user.mfaEnabled,
        },
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  const setupMFA = async (req, res) => {
    try {
      const user = req.user;
  
      // Generate secret
      const secret = generateSecret();
  
      // Create OTP auth URL
      const otpAuthUrl = generateURI({
        label: user.email,
        issuer: "AdvancedAuthAPI",
        secret,
      });
  
      // Generate QR code
      const qrCodeImageUrl = await QRCode.toDataURL(otpAuthUrl);
  
      // Save secret temporarily
      user.mfaSecret = secret;
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: "MFA setup initialized",
        secret,
        qrCodeImageUrl,
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to setup MFA",
      });
    }
  };

  const verifyMFA = async (req, res) => {
    try {
      const user = req.user;
  
      const { token } = req.body;
  
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "MFA token is required",
        });
      }
  
      const verification = await verify({
        token,
        secret: user.mfaSecret,
      });

      const isValid = verification?.valid === true;
  
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid MFA code",
        });
      }
  
      user.mfaEnabled = true;
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: "MFA enabled successfully",
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to verify MFA",
      });
    }
  };

  module.exports = {
    register,
    login,
    setupMFA,
    verifyMFA,
  };