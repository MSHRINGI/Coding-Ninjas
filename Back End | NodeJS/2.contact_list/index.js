const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose')
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));

// Middleware 1
app.use(function(req, res, next){
    // console.log("inside middleware 1");
    next();
})

// Middleware 2
app.use(function(req, res, next){
    // console.log("inside middleware 2");
    next();
})

var contactList = [
    {
        name : "Manish",
        phone : '7023099362'
    },
    {
        name : 'Ajay',
        phone : '7568522362'
    },
    {
        name : 'Shubham',
        phone : '9461640362'
    }
]

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts");
            return;
        }
        return res.render('home',{
            title: 'Contacts List',
            contact_list: contacts
        })
    })

    // res.render('home', {
    //     title : "Contacts List",
    //     contact_list : contactList
    // });
    // res.send("<h1>Hello! MS</h1>")
});

app.get('/profile', function(req, res){
    res.render('profile', {
        title : "My Profile"
    });
})

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });
    // return res.redirect('back');
    

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
        if(err){
            console.log("Error in creating the contact");
            return;
        }
        console.log("Created Contact =", newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact', function(req, res){
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    //     // console.log(contactList);
    // }
    // return res.redirect('back');
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting contact");
            return;
        }
        return res.redirect('back');
    })
})

app.listen(port, function(err){
    if(err){
        console.log("Error", err);
        return;
    }
    console.log("My server is running on port:", port);
})