const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdCases: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Case'
        }
    ],
    contributingCases: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Case'
        }
    ]
})