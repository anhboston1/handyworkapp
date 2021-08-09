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
  private socket: Socket;
  constructor() {
    this.socket = io("http://localhost:8080");
    this.socket.on("privatemessage", (data: any) => {

    })
   }

   protected sendMessage(data: Message) {
    this.socket.emit("privatemessage", data);
   }

   protected sendUserInfo(data: UserInfo) {
    this.socket.emit("myinfo", data);
   }
}
