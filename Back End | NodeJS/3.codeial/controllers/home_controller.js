
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
   // return res.end('<h1> On the home through home_controller</h1>');

   // res.render('home', {
   //    title : "Codeial"
   // })

   try {
      let posts = await Post.find({})
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
         });

      let users = await User.find({});

      return res.render('home', {
         title: "Codeial | Home",
         posts: posts,
         all_users: users
      });

   } catch (err) {
      console.log("Error", err);
      return;
   }
}