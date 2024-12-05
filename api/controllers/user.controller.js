const { Users } = require('../models');
const bcrypt = require('bcrypt');
require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth.middleware');
require('dotenv').config();
const cloudinary = require('../utils/cloudinary');


exports.createUser = async (req, res) => {
    const data = req.body;
    console.log(req.file);
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
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars',
                // width: 150,
                // height: 150,
                // crop: 'fill'
            });
            const user = new Users({
                username: data.username,
                password: hashedPassword,
                email: data.email,
                name: data.name,
                avatar: {
                    public_id: result.public_id,
                    url: result.secure_url
                },
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

exports.loginUser = async (req, res) => {
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

// Update User by ID
exports.patchUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // If password is being updated, hash the new password
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // If uploads is being updated, delete old uploads from Cloudinary and upload new uploads
        if (req.file) {
            if (user.avatar && user.avatar.public_id) {
                // Delete old uploads
                await cloudinary.uploader.destroy(user.avatar.public_id, {
                    invalidate: true
                });
            }

            // Upload new uploads
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars',
                // width: 150,
                // height: 150,
                // crop: 'fill'
            });
            updateData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const updatedUser = await Users.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
