import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import {environment} from '../environments/environment';

const CHAT_URL = 'ws://echo.websocket.org/';
let wordArr = ['Panda','Monkey']

export interface Message {
	beginx: number,
	beginy: number,
	endx: number,
	endy: number
}

@Injectable()
export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					beginx: data.beginx,
					beginy: data.beginy,
					endx: data.endx, 
					endy:data.endy
				}
			});
	}
}