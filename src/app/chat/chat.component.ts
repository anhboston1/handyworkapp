import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat, UsersChat } from './chat.model';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'app/shared/services/config.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
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
  constructor(private elRef: ElementRef, private renderer: Renderer2, private auth: AuthService, private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigService, private cdr: ChangeDetectorRef,
    private chatService: ChatService) {
    this.config = this.configService.templateConf;
    if (chatService.usersChat.length > 0) {
      this.usersChat = chatService.usersChat;
      this.activeChat = chatService.usersChat.find(_ => _.isActiveChat);
      this.chats = this.activeChat.chats;
      this.activeChatUser = this.activeChat.name;
      this.activeChatUserImg = this.activeChat.avatar;
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
        clearInterval(this.obsInterval);
      }
      this.cdr.detectChanges();
    }, 1000);
  } 
  obsInterval: any;
  ngOnInit() {
  }

  ngOnDestroy() {

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
      "message": this.newMessage,
      "timestamp": new Date() 
    }
    console.log(message);
    this.http.post(`${environment.apiUrl}/chat-messages`, message).subscribe((res) => {
      this.chatService.startObservables();
    });

    this.chatService.stopObservers();
    this.chatService.startObservables();
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

}
