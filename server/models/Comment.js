const { Schema } = require("mongoose");

const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        default: "Anonymous"
    }
});

module.exports = CommentSchema;