class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`${chatBoxId}`);
        this.userEmail = userEmail;

        let connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        this.socket = io.connect('http://localhost:5000',connectionOptions);

        // this.socket = io.connect('http://localhost:5000');
        if(userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("Connection established using socket...!");

            self.socket.emit('join_room', {
                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log("A user joined", data);
            });

            $('#send-message').click(function(){
                let msg = $('#chat-message-input').val();
                // console.log("Button clicked and msg= ", msg);
                if(msg != ""){
                    self.socket.emit('send-message', {
                        message : msg,
                        user_email : self.userEmail,
                        chatroom : 'codeial'
                    });
                }
            });

            self.socket.on('receive_message', function(data){
                let newMessage = $('<li>');
                let messageType = 'other-message';
                if(data.user_email == self.userEmail){
                    messageType = 'self-message';
                }
                newMessage.append($('<span>', {
                    'html' : data.message
                }));
                newMessage.append($('<sub>', {
                    'html' : data.user_email
                }));
                newMessage.addClass(messageType);
                $('#chat-messages-list').append(newMessage);
            })
        });
    }
}