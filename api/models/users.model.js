const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255
    },
    name: {
        type: String,
        required: true,
        maxLength: 255
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    available: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Users', users)