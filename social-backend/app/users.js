const path = require('path');
const fs = require('fs');

const express = require('express');
const axios = require('axios');
const bcrypt = require("bcrypt");


const config = require('../config');
const User = require('../models /User');
const {nanoid} = require("nanoid");
const auth = require('../middleware/auth');
const upload = require('../multer').avatar;

const router = express.Router();

router.post ('/',upload.single('avatar'), async (req, res) => {
    const userData = req.body;
    if (req.file) {
        userData.avatar = req.file.filename;
    }
    const user = new User(userData);
    try {
        user.generateToken();
        await user.save();
        return res.send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
});
router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username or password not correct'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct'});
    }
    user.generateToken();
    await user.save();
    res.send(user)
});

router.post('/subscriptions', auth, async (req,res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user.subscriptions || user.subscriptions) {
        user.subscriptions.push(req.body.subscriptions)
    }
    await user.save();
    const subUsers = await User.find({subscriptions: {$in: [user.subscriptions]}});

    res.send(subUsers)
});

router.delete('/sessions', async (req, res) => {
    const success = {message: "Success"};
    try {
        const token = req.get('Authorization').split(' ')[1];
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);

        user.generateToken();
        await user.save();
        res.send(success);
    } catch (error) {
        return res.send(success)
    }

});

router.patch('/profile', [auth, upload.single('avatar')], async (req,res) => {
    try {
        if (req.body.password) {
            req.user.password = req.body.password
        }

        if (req.file) {
            if (req.user.avatar) {
                await fs.promises.unlink(path.join(config.uploadPath, req.user.avatar))
            }
            req.user.avatar = req.file.filename
        }

        if (req.body.username) {
            req.user.username = req.body.username
        }

        await req.user.save();

        return res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.post('/facebook', async (req, res) => {

    try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(url);

        console.log(req.body.picture.data.url);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'})
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'User ID incorrect'})
        }

        let user = await User.findOne({facebookId: req.body.id});
        if (!user) {
            const [firstName, lastName] = req.body.name.split(' ');
            user = new User({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                firstName,
                lastName,

            })
        }
        user.generateToken();
        await user.save();

        return res.send(user)
    } catch (e) {
        return res.sendStatus(401)
    }



});


module.exports = router;