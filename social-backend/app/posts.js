const path = require('path');

const express = require('express');
const multer = require('multer');
const {nanoid} = require("nanoid");

const config = require('../config');
const auth = require('../middleware/auth');
const Post = require('../models /Post');



const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});
router.get('/tags', async (req, res) => {
    const tags = await Post.distinct('tags');

    return res.send(tags)
});
router.get('/', auth, async (req, res) => {
    console.log(req.user._id)
   const posts = await Post.find({user: req.user._id});
   res.send(posts)
});
router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const postData = {
            text: req.body.text,
            tags: JSON.parse(req.body.tags)
        };
        if(!postData.user) {
            postData.user = req.user._id
        }
        if (req.file) {
            postData.image = req.file.filename
        }
        const post = new Post(postData);
        await post.save();
        res.send(post)
    } catch (e) {
        res.status(401).send(e)
    }

});



module.exports = router;