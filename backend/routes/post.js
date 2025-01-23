const express = require('express');
const Post = require('../schema/posts.model');
const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const {
            title,
            description
        } = req.body;

        const postExists = await Post.find({
            title,
            description
        })

        if (postExists) {
            return res.status(203).json({
                statusCode: 203,
                message: "Record Already Exists!"
            })
        }

        const newPost = new Post({
            title,
            description
        })

        newPost.save();

        return res.status(200).json({
            statusCode: 200,
            data: newPost
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong"
        })
    }
})

router.get("/", async (req, res) => {
    try {

        const posts = await Post.find({});

        return res.status(200).json({
            statusCode: 200,
            data: posts
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong"
        })
    }
})

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params.id;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                statusCode: 404,
                message: "Post not found"
            })
        }

        return res.status(200).json({
            statusCode: 200,
            data: post
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong"
        })
    }
})

router.put('/:id', async (req, res) => {
    try {

        const { id } = req.params.id;
        const {
            title,
            description
        } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                statusCode: 404,
                message: "Post not found"
            })
        }

        post.title = title ? title : post.title;
        post.description = description ? description : post.description;

        await post.save();

        return res.status(200).json({
            statusCode: 200,
            data: post
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong"
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params.id;

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({
                statusCode: 404,
                message: "Post not found"
            })
        }

        return res.status(200).json({
            statusCode: 200,
            message: "Post deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong"
        })
    }
})

module.exports = router;