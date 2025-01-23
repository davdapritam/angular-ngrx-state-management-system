const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;