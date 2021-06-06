'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const files = new Schema({
    id: {
        type: String
    },
    filename: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    }
});


const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    files: [files]
});

const User = mongoose.model('user', userSchema);
module.exports = User;