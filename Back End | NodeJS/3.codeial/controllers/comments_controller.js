
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    // console.log("This is the post id you wanna check ", req.body.post);
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            // console.log("this is the post object", post);
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log("Error in creating comment", err);
                    return;
                }
                // now push comment into the comment array at post.js in models
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
        }
    })
}

module.exports.destroy = function (req, res) {

    Comment.findById(req.params.id, function (err, comment) {
        let postId = comment.post;
        let postUserId;
        Post.findById(postId, function (err, post) {
            postUserId = post.user;

            if (comment.user == req.user.id || postUserId == req.user.id) {
                
                comment.remove();

                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                    if (err) {
                        console.log("Error in deleting comment from comment array");
                        return res.redirect('back');
                    }
                    // return res.redirect('back');
                });

                return res.redirect('back');
            } else {
                console.log("Comment not found or something wrong");
                return res.redirect('back');
            }
        });
    });
}