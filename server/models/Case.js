const { Schema, model } = require('mongoose');

const caseSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateMissing: {
        type: Date,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contributors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    images: [
        {
            data: Buffer,
            contentType: String
        }
    ]
})