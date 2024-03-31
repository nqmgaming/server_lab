const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fruits = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 255
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: Number,
        required: true,
        default: 0 // 0: not sold, 1: sold, -1 : deleted
    },
    image: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    distributor: {
        type: Schema.Types.ObjectId,
        ref: 'Distributors',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Fruits', fruits)