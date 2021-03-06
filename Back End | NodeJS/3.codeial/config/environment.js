const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval : '1d',
    path : logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'somethingYouCanNotCrack',
    db: 'codeial_devlopment',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 857,
        secure: false,
        auth: {
            user: 'mshringi22@gmail.com',
            // chenged when pushed on github
            pass: 'codingninjas'
        }
    },
    google_client_id : '285418167104-tdv5ab2ee089f311fkbnvj3p4e7r36lq.apps.googleusercontent.com',
    google_client_secret : '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',
    google_call_back_url : 'http://localhost:8000/users/auth/google/callback',
    jwt_secret : 'codeial',
    morgan : {
        mode: 'dev',
        options : {stream : accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 857,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GOOGLE_USERNAME,
            // chenged when pushed on github
            pass: process.env.CODEIAL_GOOGLE_PASSWORD
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan : {
        mode: 'combined',
        options : {stream : accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);