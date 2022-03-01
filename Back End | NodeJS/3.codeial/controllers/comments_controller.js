
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    // console.log("This is the post id you wanna check ", req.body.post);
    Post.findById(req.body.post, function(err, post){
        if(post){
            // console.log("this is the post object", post);
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function(err, comment){
                if(err){
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