import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat, UsersChat } from './chat.model';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'app/shared/services/config.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { environment } from 'environments/environment';
//import { ChatsocketService } from './chatsocket.service';

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

var userInfo: UserInfo;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  chats: Chat[] = [];
  activeChat: UsersChat;
  usersChat: UsersChat[] = [];
  activeChatUser: string;
  activeChatUserImg: string;
  loggedInUserImg: string;
  newMessage = "";
  searchQuery: string = '';
  placement = "bottom-right";
  isContentOverlay = false;

  public config: any = {};
  layoutSub: Subscription;


  messages = new Array();
  item: number = 0;
  constructor(private elRef: ElementRef, 
    private renderer: Renderer2, 
    private auth: AuthService, 
    private http: HttpClient,
    @Inject(DOCUMENT) 
    private document: Document,
    private configService: ConfigService, 
    private cdr: ChangeDetectorRef,
    private chatService: ChatService,
) {

    this.initializeSocket();

    this.config = this.configService.templateConf;

    let userInfo:any;
    if (chatService.usersChat.length > 0) {
      this.usersChat = chatService.usersChat;
      this.activeChat = chatService.usersChat.find(_ => _.isActiveChat);
      this.chats = this.activeChat.chats;
      this.activeChatUser = this.activeChat.name;
      this.activeChatUserImg = this.activeChat.avatar;
      userInfo = {
        'socketId': null,
        'userId': auth.getCurrentUser().id,
        'conversationId': this.activeChat.conversationId,
        'username': auth.getCurrentUser().email
      } 
      this.sendUserInfo(userInfo);
    }


    this.loggedInUserImg = "assets/img/portrait/small/avatar-s-1.png"
    this.renderer.addClass(this.document.body, "chat-application")
  
    this.obsInterval = setInterval(() => {
      if (chatService.usersChat.length > 0) {
        this.usersChat = chatService.usersChat;
        this.activeChat = chatService.usersChat.find(_ => _.isActiveChat);
        this.chats = this.activeChat.chats;
        this.activeChatUser = this.activeChat.name;
        this.activeChatUserImg = this.activeChat.avatar;
        
        userInfo = {
          'socketId': null,
          'userId': auth.getCurrentUser().id,
          'conversationId': this.activeChat.conversationId,
          'username': auth.getCurrentUser().email
        } 
        this.sendUserInfo(userInfo);
        clearInterval(this.obsInterval);
      }
      this.cdr.detectChanges();
    }, 5000);
  } 
  obsInterval: any;
  ngOnInit() {
    //this.initializeSocket();
  }
  
  ngOnDestroy() {
    this.sendisconnected();
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }

    this.renderer.removeClass(this.document.body, "chat-application");
  }
  //send button function calls
  onAddMessage() {
    
    let message = {
      "sender": this.auth.getCurrentUser().email,
      "chatConversationId": this.activeChat.conversationId,
      "receiverId": this.activeChat.receiverId,
      "message": this.newMessage,
      "timestamp": new Date() 
    }
    console.log(message);
    this.activeChat.chats.push({
      isReceived: false,
      time: "",
      messages: [this.newMessage],
      messageType: 'text',
      chatId: ""
    })
    this.cdr.detectChanges();
    this.sendMessage(message);
  }

  viewChat(chat: UsersChat) {
    this.usersChat.forEach(chat => {
      if (chat.userId === this.activeChat.userId) {
        chat.isActiveChat = false;
      }
    })

    this.activeChat = chat;
    this.activeChat.isActiveChat = true;
    this.chats = this.activeChat.chats;
    this.activeChatUser = this.activeChat.name;
    this.activeChatUserImg = this.activeChat.avatar;
    this.isContentOverlay = false;
  }


  onSidebarToggle() {
    this.isContentOverlay = true;
  }

  onContentOverlay() {
    this.isContentOverlay = false;
  }
  private socket: Socket = null;
  public initializeSocket() {
    this.sendisconnected();
    this.socket = io("http://localhost:8080");
    this.socket.on("privatemessage", (data: any) => {
      console.log("Receiving meassage from my friend: " + JSON.stringify(data))
      console.log(this.activeChat.chats.length);
      this.activeChat.chats.push({
        isReceived: true,
        time: "",
        messages: [data.message],
        messageType: 'text',
        chatId: ""
      });
      this.cdr.detectChanges();
      console.log(this.activeChat.chats.length);
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
