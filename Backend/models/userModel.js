const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    cartData: {
        type: Object,
        default: {},
    }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;