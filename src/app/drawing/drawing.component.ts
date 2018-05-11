import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ChatService } from '../chat.service';

import {BrowserModule} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {


	constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg => {			
	  console.log("coordinate：" + msg);
		});
	}
  ngOnInit() {
  }

}
