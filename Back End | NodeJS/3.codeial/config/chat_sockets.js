
module.exports.chatSocket = function(socketServer){
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection', function(socket){
        console.log('New connection received', socket.id);
        socket.on('disconnect', function(){
            console.log("Socket Disconnected");
        });
        socket.on('join_room', function(data){
            console.log("Joining request recieved", data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send-message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        })
    });
}