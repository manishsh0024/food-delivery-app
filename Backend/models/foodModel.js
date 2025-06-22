const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

module.exports = foodModel;