//const { Router } = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [5, 'minimum username length is 5'],
        maxlength: [16, 'maximum username length is 16'],
        unique: true,
        required: [true, 'please enter a username'],
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'the email field is required'],
        lowercase: true
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'you must enter a password']
    },
})

userSchema.pre('save', async function (next) {
    const salt = bcrypt.getSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

//this or that

//module.exports = mongoose.model('user',userSchema)


