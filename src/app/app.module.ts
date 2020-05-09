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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import { TicketGenerator } from './services/ticket-generator-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TicketCountDialog } from './ticket-count-dialog/ticket-count-dialog';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    NumpadComponent,
    TicketCountDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatSliderModule
  ],
  providers: [NumpadService,PatternAnnouncerService ,HttpClient,TicketGenerator],
  bootstrap: [AppComponent],
  entryComponents : [TicketCountDialog]
})
export class AppModule { }
