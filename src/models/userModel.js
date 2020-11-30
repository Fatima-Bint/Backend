const { Router } = require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    //username: {String, minlength: 5, maxlength: 16, unique: true},
    username: {String}, 
        //maxlength: 16, unique: true},
    email: {type: String, unique: true},
    password: {type: String, minlength: 8},
})

const User = mongoose.model('user', userSchema)

module.exports = User

//this or that

//module.exports = mongoose.model('user',userSchema)


