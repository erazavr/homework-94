const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

const users = require('./app/users');
const posts = require('./app/posts');

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/users', users);
    app.use('/posts', posts);
    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});