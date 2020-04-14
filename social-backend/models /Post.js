const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: true
    },
    text: {
        type: String,
        validate: {
            validator: function(value) {
                return !!(value || this.image);
            },
            message: 'Text'
        }
    },
    image: {
        type: String,
        validate: {
            validator: function(value) {
                return !!(value || this.text);
            }
        },
        message: 'Image'
    },
    tags: [String]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;