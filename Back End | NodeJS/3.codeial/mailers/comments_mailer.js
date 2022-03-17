const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside the mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from : 'mshringi22@gmail.com',
        to : comment.user.email,
        subject : "New Comment Published!",
        html : htmlString
    }, function(err, info){
        if(err){
            console.log('error in sending mail through mailers', err);
            return;
        }
        console.log("Message Sent", info);
        return;
    });
}