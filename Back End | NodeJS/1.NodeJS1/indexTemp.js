const http = require('http');
const port = 2212;
const fs = require('fs');

function requestHandler(req, res){
    console.log(req.url);
    let filePath;
    switch(req.url){
        case '/':
            filePath = './index.html';
            break;
        case '/profile':
            filePath = './profile.html';
            break;
        default:
            filePath = './404.html';
            break;
    }
    fs.readFile(filePath, function(err, data){
        if(err){
            console.log("Error", err);
            return err;
        }
        res.end(data);
    })
    // res.end("hello!");
}

const server = http.createServer(requestHandler);
server.listen(port, function(err){
    if(err){
        console.log("error ", err);
        return;
    }
    console.log("Server is running: ", port);
})