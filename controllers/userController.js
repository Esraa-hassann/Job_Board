const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const upload =require('./fileUpload');

// Create a new user
exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a user by ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Password provided:', password);
        console.log('Stored hashed password:', user.password);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password valid:', validPassword);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
            
        }

        // Generate a JWT token with user ID and userType
        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        const response = {
            token: token,
            role: user.role,
            userId: user._id
        };

        res.json(response);
       // console.log(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user information from token
exports.getUserFromToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, 'your_jwt_secret');

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ id: user._id, email: user.email, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Failed to authenticate token' });
    }
};

// Register a user
exports.registerUser = async (req, res) => {
    const { email, password, role, profile } = req.body;

    if (!email || !password || !role || !profile ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        let resumePath = null;
        if (req.file){
            resumePath = req.file.path;
            profile.resume = resumePath;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            profile
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

