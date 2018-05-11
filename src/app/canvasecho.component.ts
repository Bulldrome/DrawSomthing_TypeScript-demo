import {
  Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

import {BrowserModule} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }'],
  providers: [ WebsocketService, ChatService ]
})

export class CanvasechoComponent implements AfterViewInit {

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {      
      console.log("Response from websocket: " + msg);
    });
  }
  //

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 520;
  @Input() public height = 350;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 2;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);
  }
  
  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
  
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
  
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
  
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
    ) {
    if (!this.cx) { 
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

}