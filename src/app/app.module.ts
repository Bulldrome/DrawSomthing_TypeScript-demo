 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebSocketService } from 'angular2-websocket-service';

import { AppComponent } from './app.component';
import { DrawingComponent } from './drawing/drawing.component';
import { ShowingComponent } from './showing/showing.component';
import { FormsModule } from '@angular/forms';

import { CanvasComponent } from './canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    DrawingComponent,
    ShowingComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
