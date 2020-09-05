const { Schema, Types, model } = require('mongoose');

const todo = new Schema({
    title: {
        type: String, required: true
    },
    description: String,
    isCompleted: {
        type: Boolean, default: false
    },
    userId: {
        type: Types.ObjectId, index: true
    },
    comments: [
        { type: Types.ObjectId, ref: 'Comment' }
    ]
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = model('Todo', todo);