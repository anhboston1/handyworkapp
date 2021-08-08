import { Server } from "socket.io";
const https = require('http');

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
        //io.to(socket.id).emit("todos", todos);
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
            this.io.to(receiverSocket[0].socketId).emit(`privatemessage`, {
                error : false,
                singleUser : false,
                chatList : data
            });
        }

        //Update database with the new message
      }); 

  });


  ///////////////


let numUsers = 0;

io.on('connection111', (socket: any) => {
  let addedUser = false;
  
  socket.on('privatemessage', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  }); 

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

    //Call handyworkAPI to save the massge into the chat message table
    //then broadcast the message to everyone.
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/chat-messages',
      method: 'GET'
    }
    
    const req = https.request(options, res => {
      console.log(`chat message: ${res}`)
    
       res.on('data', d => {
        process.stdout.write(d)
      }) 
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.end();

  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});