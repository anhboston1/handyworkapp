import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";

interface UserInfo {
  socketId?: string;
  userId: string;
  conversationId: string;
  username: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  conversationId: string;
  sendername?: string;
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})

export class ChatsocketService {
  private socket: Socket = null;
  constructor() {
    
   }

   public initializeSocket() {
    this.sendisconnected();
    this.socket = io("http://localhost:8080");
    this.socket.on("privatemessage", (data: any) => {
      console.log("Receiving meassage from my friend: " + JSON.stringify(data))
    })
   }

   public sendMessage(data) {
    this.socket.emit("privatemessage", data);
   }

   public sendUserInfo(data: UserInfo) {
    this.socket.emit("myinfo", data);
   }

   public sendisconnected(){
    if (this.socket !== null) {
      this.socket.emit("user logout", {});
    }
   }
}
