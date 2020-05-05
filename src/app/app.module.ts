import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TicketComponent} from './ticket-ui/ticket.component';
import {NumpadComponent} from './numpad/numpad.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NumpadService } from './services/numpad-service';
import { PatternAnnouncerService } from './services/pattern-announcer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    NumpadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [NumpadService,PatternAnnouncerService],
  bootstrap: [AppComponent,TicketComponent,NumpadComponent]
})
export class AppModule { }
