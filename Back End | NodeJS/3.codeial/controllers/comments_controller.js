
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    console.log("This is the post id you wanna check ", req.body.post);

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        } else {
            return;
        }
    } catch (err) {
        console.log("Error in creating comment", err);
        return;
    }

}

module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id).populate('post');
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            comment.remove();
            await Post.findByIdAndUpdate(comment.post.id, { $pull: { comments: req.params.id } });
        } else {
            console.log("Comment not found or something wrong");
        }
        return res.redirect('back');
    } catch (err) {
        console.log("Error in deleting comment from comment array", err);
        return;
    }

}