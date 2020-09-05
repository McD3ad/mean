const { Schema, Types, model } = require('mongoose');

const comment = new Schema({
    message: {
        type: String, required: true
    },
    todo: {
        type: Types.ObjectId, ref: 'Todo'
    },
}, { timestamps: { createdAt: true, readAt: true } });

module.exports = model('Comment', comment);