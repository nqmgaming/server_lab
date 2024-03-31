const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distributors = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 255
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Distributors', distributors)