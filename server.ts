import { Server } from "socket.io";
const axios = require('axios');

const io = new Server(8080, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

interface UserInfo {
    socketId: string;
    userId: string;
    conversationId: string;
    username: string;
}
let userSockets: Array<UserInfo> = [];

interface Message {
    receiverId: string;
    chatConversationId: string;
    sender: string;
    message: string;
    timestamp: Date;
}

interface Todo {
    completed: boolean;
    editing: boolean;
    title: string;
  }
  
  //let todos: Array<Todo> = [];
  io.on("connection", (socket) => {
      console.log("Connected socket.id = " + socket.id);
        
      //User will emit 'myinfo' event so server keep track user info
      socket.on('myinfo', (userData: UserInfo) => {
        console.log("Received myinfo event...")
        let userSocket = userSockets.filter(x => x.userId === userData.userId && x.conversationId == userData.conversationId);
        if (userSocket.length > 0) {
          console.log("Received myinfo event... replacing socket")
          userSocket[0].socketId = socket.id;
        }
        else {
          userSocket = userSockets.filter(x => x.socketId === socket.id);
          if (userSocket.length === 0) {
              let tmp: UserInfo = userData;
              tmp.socketId = socket.id;
              userSockets.push(tmp);
              socket.broadcast.emit('user login', {
                  username: userData.username,
                  message: userData
                });
          }
          else {
              console.log ("User try to emit 'myinfo' more then once")
          }
        }
        console.log("Number of sockets: " + userSockets.length);
        console.log("Number of sockets: " + JSON.stringify(userSockets));
      }); 
      //User send message to his friend
      socket.on('privatemessage', (data: Message) => {
        console.log("privatemessage event... data = " + JSON.stringify(data));
        let receiverId = data.receiverId;
        let conversationId = data.chatConversationId;

        let receiverSocket = userSockets.filter(x => x.conversationId === conversationId && x.userId === receiverId);
        console.log("receiverSocket.length =  " + receiverSocket.length);
        console.log("Number of sockets: " + JSON.stringify(userSockets));

        if (receiverSocket.length > 0) {
          console.log("Sending to socketId ")
            console.log("Sending too socketId = " + receiverSocket[0].socketId);
            socket.to(receiverSocket[0].socketId).emit(`privatemessage`, data);
        }

        //Update database with the new message
        let testmessage = {
          "sender": data.sender,
          "chatConversationId": data.chatConversationId,
          "message": data.message,
          "timestamp": new Date() 
        };
        //console.log(testmessage);

        axios
        .post('http://localhost:3000/chat-messages', testmessage)
        .then(res => {
          console.log(`statusCode: ${res}`)
          console.log(res)
        })
        .catch(error => {
          console.error(error)
        })


        //End
      }); 

      socket.on('typing', () => {
        socket.broadcast.emit('typing', {
          username: "socket.username"
        });
      });
    
      // when the client emits 'stop typing', we broadcast it to others
      socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
          username: "socket.username"
        });
      });
    
      // when the user disconnects.. perform this
      socket.on('user logout', () => {
        console.log("disconnect event...")
        userSockets = userSockets.filter(x => x.socketId !== socket.id);
        socket.broadcast.emit('user left', {
          username: "socket.username"
        });
        console.log("Number of sockets: " + userSockets.length);
        console.log("Number of sockets: " + JSON.stringify(userSockets));
      });

  });
