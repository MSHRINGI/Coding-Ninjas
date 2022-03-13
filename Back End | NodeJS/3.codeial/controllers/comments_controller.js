
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
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment : comment
                    },
                    message : 'Comment Created!'
                });
            }
            req.flash("success", "Commented!");
            return res.redirect('/');
        } else {
            req.flash('error', 'Something wrong!');
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Error in creating comment", err);
        req.flash('error', err);
        return res.redirect('/');
    }

}

module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id).populate('post');
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            comment.remove();
            await Post.findByIdAndUpdate(comment.post.id, { $pull: { comments: req.params.id } });
            req.flash("success", "Comment deleted!");
        } else {
            req.flash('error', 'Something wrong!');
            console.log("Comment not found or something wrong");
        }
        return res.redirect('back');
    } catch (err) {
        console.log("Error in deleting comment from comment array", err);
        req.flash('error', err);
        return res.redirect('/');
    }

}