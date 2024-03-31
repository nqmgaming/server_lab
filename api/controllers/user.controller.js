const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth.middleware');
require('dotenv').config();
const cloudinary = require('../utils/cloudinary');


exports.createUser = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    if (data.username && data.password && data.email && data.name) {
        const usernameExist = await Users.findOne({ username: data.username });
        if (usernameExist) {
            return res.status(409).json({
                message: 'Username already exist'
            });
        }
        const emailExist = await Users.findOne({ email: data.email });
        if (emailExist) {
            return res.status(409).json({
                message: 'Email already exist'
            });
        }
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const result = await cloudinary.uploader.upload(req.file.path); // Upload image to Cloudinary
            const user = new Users({
                username: data.username,
                password: hashedPassword,
                email: data.email,
                name: data.name,
                avatar: result.secure_url, // Save Cloudinary URL to avatar field
                available: data.available
            })
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

exports.loginUser = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    if (data.username && data.password) {
        try {
            const user = await Users.findOne({ username: data.username });
            if (user) {
                const match = await bcrypt.compare(data.password, user.password);
                if (match) {
                    const token = authenticateToken.createToken(user);
                    const { _id, username, email, name, avatar, available } = user;
                    res.status(200).json({
                        _id,
                        username,
                        email,
                        name,
                        avatar,
                        available,
                        token
                    });
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    });
                }
            } else {
                res.status(404).json({
                    message: 'Not Found'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}
