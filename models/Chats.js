
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: true
    },

    msg: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        required: true
    }
});

const Chats = mongoose.model('chats', chatSchema);

module.exports = Chats;