import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: any;
  messages: any[] = [];
  message: string = '';
  myId: string = '';

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');


    this.socket.on('connect', () => {
      this.myId = this.socket.id;
    });


    this.socket.on('chat message', (msg: any) => {
      this.messages.push(msg);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const msg = {
        text: this.message,
        sender: this.myId,
        timestamp: new Date().toISOString()
      };
      this.socket.emit('chat message', msg);
      this.message = '';
    }
  }
}
