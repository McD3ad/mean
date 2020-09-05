const { Schema, Types, model } = require('mongoose');

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'client',
        required: true
    },
    meta: [
        { type: Types.ObjectId, ref: 'Todo' }
    ]
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = model('User', user);
