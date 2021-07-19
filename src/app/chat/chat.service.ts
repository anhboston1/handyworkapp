import { Injectable } from '@angular/core';
import { Chat, UsersChat } from './chat.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class ChatService {

  constructor(private auth: AuthService, private http: HttpClient) { 
    //console.log("ChatService auth.getCurrentUser(): ", auth.getCurrentUser());
    this.getChatConversations().subscribe((res) => {
      //console.log("his.getChatConversations() = ", res);
      let temp:any = res;
      //this.usersChat = [];
      temp.forEach(element => {
        this.getConverstionDetail(element);
      });
    });
    this.startObservables();
  }
  obsInterval: any;
  startObservables() {
    this.getChatConversations().subscribe((res) => {
      let temp:any = res;
      temp.forEach(element => {
        this.getConverstionDetail(element);
      });
    })
    this.obsInterval = setInterval(() => {
      this.getChatConversations().subscribe((res) => {
        let temp:any = res;
        temp.forEach(element => {
          this.getConverstionDetail(element);
        });
      })
    }, 10000);
    
  }
  stopObservers() {
    clearInterval(this.obsInterval)
  }

  getSenerName(paticipants:any){
    let name = "";
    paticipants.forEach(element => {
      if (element.id !== this.auth.getCurrentUser().id) {
        name = element.name;
      }
    });
    return name;
  }
  getSenderEmail(paticipants:any){
    let id = "";
    paticipants.forEach(element => {
      if (element.id !== this.auth.getCurrentUser().id) {
        id = element.email;
      }
    });
    //console.log("getSenerEmail = " + id);
    return id;
  }
  public getConverstionDetail(element) {
    this.http.get(`${environment.apiUrl}/chat-conversations/${element.ChatConversationId}`).subscribe((res) =>{
      //console.log("getConverstionDetail ", res);
      let temp:any = res;
      let senderEmail = this.getSenderEmail(temp.participants);
      
      var chatConv: UsersChat = {
        userId: temp.id,
        conversationId: temp.id,
        name: this.getSenerName(temp.participants),
        avatar: "assets/img/portrait/small/avatar-s-2.png",
        lastChatTime: "9:04 PM",
        status: "online",
        isPinnedUser: true,
        isMuted: false,
        unreadMessageCount: "",
        isActiveChat: true,
        lastChatMessage: "Okay",
        chats: []
      };
      let temp_val = this.usersChat.filter(ele => ele.conversationId === chatConv.conversationId);
      if (temp_val !== null && temp_val.length > 0) {
        chatConv = temp_val[0];
      }
      else {
        this.usersChat.push(chatConv);
      }

      this.getConversationMessages(temp.id).subscribe((retVal) => {
        console.log("getConversationMessages ", retVal);
        let temp:any = retVal;
        temp.forEach(element => {
          let isReceived = false;
          if (senderEmail === element.sender) {
            isReceived = true;
          }
          let mychat:Chat = new Chat(isReceived,
          '',
          [
            element.message
          ],
          'text',
          element.id
          );

          //check if the message already in the chats, skip if it exist, other wie insert.
          let temp_val = chatConv.chats.filter(ele => ele.chatId === mychat.chatId);
          if (temp_val.length == 0) {
            chatConv.chats.push(mychat);
          }
          //console.log("this.usersChat = ", this.usersChat);
        });
        
      });
    })
  }
  
  //chat1: Chat[] = [];
  getConversationMessages(id){
    return this.http.get(`${environment.apiUrl}/chat-conversations/${id}/chat-messages?filter[order]=timestamp%20ASC`);
    
  }
  public getChatConversations(){
    return this.http.get(`${environment.apiUrl}/users/${this.auth.getCurrentUser().id}/user-chat-conversations`);
  }
    public chat1: Chat[] = [
    new Chat(
      false,
      '',
      [
        ''
      ],
      'text', "1")
  ]; 
  
 //public usersChat: UsersChat[];
  public usersChat: UsersChat[] = [
    {
      userId: "1",
      conversationId: "1",
      name: "Phuong",
      avatar: "assets/img/portrait/small/avatar-s-2.png",
      lastChatTime: "9:04 PM",
      status: "online",
      isPinnedUser: true,
      isMuted: false,
      unreadMessageCount: "",
      isActiveChat: true,
      lastChatMessage: "Okay",
      chats: this.chat1
    }
  ]
}
