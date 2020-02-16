const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    imageUrl: String,
    content: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("blog", blogSchema);