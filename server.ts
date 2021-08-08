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
    senderId: string;
    receiverId: string;
    conversationId: string;
    sendername: string;
}

interface Todo {
    completed: boolean;
    editing: boolean;
    title: string;
  }
  
  let todos: Array<Todo> = [];
  io.on("connection", (socket) => {
      console.log("Connected socket.id = " + socket.id);
      socket.emit("todos", todos);

      console.log(JSON.stringify(todos));
      // note: we could also create a CRUD (create/read/update/delete) service for the todo list
      socket.on("update-store", (updatedTodos) => {
        // store it locally
        todos = updatedTodos;
        // broadcast to everyone but the sender
        socket.broadcast.emit("todos", todos);
        console.log("socket.id = " + socket.id);
      });
      
      //User will emit 'myinfo' event so server keep track user info
      socket.on('myinfo', (userData: UserInfo) => {
        let userSocket = userSockets.filter(x => x.socketId === socket.id);
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
      }); 
      //User send message to his friend
      socket.on('privatemessage', (data: Message) => {
        let receiverId = data.receiverId;
        let conversationId = data.conversationId;

        let receiverSocket = userSockets.filter(x => x.conversationId === conversationId && x.userId === receiverId);
        if (receiverSocket.length > 0) {
            socket.to(receiverSocket[0].socketId).emit(`privatemessage`, {
                error : false,
                singleUser : false,
                chatList : data
            });
        }

        //Update database with the new message
        let testmessage = {
          "sender": "pnguyen2k@yahoo.com",
          "chatConversationId": "7f0a881a-0644-45a9-87a6-f7df7c896856",
          "message": "Test sending message from chat server",
          "timestamp": new Date() 
        };
        console.log(testmessage);

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
      socket.on('disconnect', () => {
        socket.broadcast.emit('user left', {
          username: "socket.username"
        });
      });

  });
