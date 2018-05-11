import { Component, NgModule } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

import {BrowserModule} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})

export class AppComponent {

	constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg => {			
      console.log("coordinate：" + msg);
		});
	}

  private message = {
		beginx: 1,
		beginy: 2,
		endx: 3,
		endy: 4
	}

  sendMsg() {
		console.log('websocket Message： ', this.message);
		this.chatService.messages.next(this.message);
	}

}