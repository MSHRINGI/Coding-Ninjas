
const Post = require('../models/post');

module.exports.home = function(req, res){
   // return res.end('<h1> On the home through home_controller</h1>');

   // res.render('home', {
   //    title : "Codeial"
   // })

   Post.find({})
   .populate('user')
   .populate({
      path : 'comments',
      populate : {
         path : 'user'
      }
   })
   .exec(function(err, posts){
      return res.render('home', {
         title : "Codeial | Home",
         posts : posts
      });
   });
}