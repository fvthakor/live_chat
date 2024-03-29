import { Component, OnInit, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment'
@Injectable()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private socket: any;
  constructor() { }
  //messages:any[] = [];
  private messages: any[] = [];
  condition:boolean = false;
  userCondition:boolean = true;
  username:string='';
  chats: any[] = [
    {
      status: 'success',
      title: 'Chat',
      messages: this.messages,
    },
  ];
  ngOnInit(): void {
    this.socket = io(`${environment.socketUrl}`, { transports: ['websocket'] });
    this.socket.on('chat message', (data: any) => {
      if(data.user.name == this.username){
        var $reply = true;
        data.user.name = '';
      }else{
        var $reply = false;
      }
      data.reply = $reply;
      this.messages.push(data);
    });
  }

  saveUser(event){
    if(this.username != ''){
      this.condition = true;
      this.userCondition = false;
      //this.socket.emit("save user", this.username);
    }else{
      alert('Name is required');
    }
    
  }

  

  sendMessage(messages, event) {
    var msg = {
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: this.username,
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
    };
    this.socket.emit("chat message", msg);
    /*messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
    });*/
  }

}
