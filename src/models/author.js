const mongoose = require ('mongoose')

const authorSchema = new mongoose.Schema({
    nameAuthor: {type: String, minlength: 5, maxlength:20},
    title: {type: String, minlegth: 5, maxlength: 50},
    numOfPages: {type: Number, minlength: 1},
    ISBN: {type: Number},
    bookLikes: {type: Number, minlength: 0}

})

module.exports = mongoose.model('author', authorSchema)