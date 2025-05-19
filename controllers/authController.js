const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { username, password, role_id } = req.body;

    // Check if role_id is provided
    if (!role_id) {
      return res.status(400).json({ error: 'Role ID is required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, password: hashedPassword, role_id });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1d' }
    );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

  


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || '1d',
    });

    res.status(200).json({ message: 'Login successful', user_id: user.id, username: user.username,  token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

