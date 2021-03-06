const express = require("express");
const env = require('./config/environment');
const logger = require('morgan');
const app = express();
require('./config/view-helper')(app);
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');

const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

if(env.name == 'development'){
    app.use(sassMiddleware({
        src : path.join(__dirname, env.asset_path, '/scss'),
        dest : path.join(__dirname, env.asset_path, '/css'),
        // debug : true,
        outputStyle : 'extended',
        prefix : '/css'
    }));
}

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
// make the uploads post available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// mongoStore is used to store cookie in db
app.use(session({
    name : 'Codeial',
    secret : env.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 60)
    },
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_devlopment',
        autoRemove: 'disabled' // Default
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server : ${err}`);
        return;
    }
    console.log(`Server is running at port : ${port}`);
});