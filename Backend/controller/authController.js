const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, refRole } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      refRole,
      role,
    });

 
    res.status(201).json({ message: 'User registered successfully',
        data:user
     });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').populate('refRole'); ;
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
        expiresIn:'1h'
    });

    user.password = undefined;

    res.status(200).json({ message: 'Login successful', token, user });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
