import { Component, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { NumpadService } from './services/numpad-service';
import { TicketComponent } from './ticket-ui/ticket.component';
import { PatternDetector } from './components/pattern-detector.module';
import { PatternSearch } from './components/pattern-contract';
import { Ticket } from './model/ticket.model';
import { QuickSeven } from './components/patterns/quick-seven';
import { Star } from './components/patterns/star';
import { Bamboo } from './components/patterns/bamboo';
import { FirstLine } from './components/patterns/first-line';
import { SecondLine } from './components/patterns/second-line';
import { ThirdLine } from './components/patterns/third-line';
import { FullHouse } from './components/patterns/full-house';
import { Subscription } from 'rxjs';
import { PatternAnnouncerService } from './services/pattern-announcer';
import Speech from 'speak-tts'
import { BadeMiyan } from './components/patterns/bade-miyan';
import { ChoteMiyan } from './components/patterns/chote-miyan';
import {TicketGenerator} from './services/ticket-generator-service';
import { MatDialog } from '@angular/material/dialog';
import { TicketCountDialog } from './ticket-count-dialog/ticket-count-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent {

  title = 'Tambola Pattern Detector';
  
  mode = 'Play'

  tickets: Array<number[]> = []

  @ViewChildren(TicketComponent) ticketComp : QueryList<TicketComponent>

  patternDetector : PatternDetector
  patterns : Array<PatternSearch> = []
  numpadSubscription : Subscription

  announceNumber = ''

  detectedPatterns : Array<PatternSearch> = []

  patternSubscription 

  speech = new Speech()

  constructor(private numpadSvc: NumpadService,private patternAncr : PatternAnnouncerService,
     private dialog : MatDialog,private ticketGenSvc : TicketGenerator ){
    if(this.speech.hasBrowserSupport()){
      this.speech.init()
    }
  }

onModeButtonClick(){
if(this.mode == 'Edit'){
      this.mode = 'Play'
      this.ticketComp.forEach(tkt => tkt.onInputModeChange(true))
      this.onPlayDisabled()
      
    }else{
      this.mode = 'Edit'
      this.ticketComp.forEach(tkt => tkt.onInputModeChange(false))
      this.onPlay()
      
    }
  }

  onTicketAdd(){
    // this.tickets.push([undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
    //                   undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
    //                   undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined])
                      // this.tickets.push([1,0,22,0,45,0,0,72,86,0,0,24,32,0,56,0,75,88,4,11,0,0,47,0,65,78,0])
    // this.ticketGen.generate(4).subscribe(tickets=> this.tickets = tickets);
    this.dialog.open(TicketCountDialog,{
      data : {count : 1 }
    }).afterClosed().subscribe( count=>
      {
        this.ticketGenSvc.generate(count).subscribe(tickets=> this.tickets = tickets);
      }
    )

  }

  onPlayDisabled(){
    if(this.numpadSubscription){
      this.numpadSubscription.unsubscribe()
    }
    if(this.patternSubscription){
      this.patternSubscription.unsubscribe()
    }
    this.patternDetector = undefined
    this.announceNumber = ''

  }

  onPlay(){
    let allTickets = new Array<Ticket>()
    this.ticketComp.forEach(tkt=> {
      allTickets.push(new Ticket(tkt.cells))
    })

    let patterns = [
      new QuickSeven() ,new Star(),new Bamboo(),
      new BadeMiyan(), new ChoteMiyan(),
      new FirstLine(),new SecondLine(),new ThirdLine(),
      new FullHouse()
    ]

    this.patternDetector = new PatternDetector(patterns,allTickets,this.patternAncr)
    this.numpadSubscription = this.numpadSvc.getNumber().subscribe(n=>this.onNumberAnnounce(n))
    this.patternSubscription = this.patternAncr.announcer().subscribe(p=> {
      this.detectedPatterns.push(p)
      this.speech.speak({text : p.friendlyName()})
      this.shoot()
      this.shoot()
    })

  }

  onNumberAnnounce(number){    
    if(number == -2 && Number(this.announceNumber) > 0){
      this.checkPattern(+this.announceNumber)
      this.announceNumber = ''
    }else{
      this.announceNumber += number.toString()
    }

    var result = Number(this.announceNumber)
    if(!(result > 0 && result<=90)){
      this.announceNumber = ''
    }
    
  }

checkPattern(number){
this.patternDetector.onNumberAnnounce(number)
    this.ticketComp.forEach(tkt=> tkt.onNumberAnnounce(number))
  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(60, 120),
        spread: this.random(10, 50),
        particleCount: this.random(40, 100),
        origin: {
            y: 0.6
        }
      });
    } catch(e) {
// noop, confettijs may not be loaded yet
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  confetti(args: any) {
    return window['confetti'].apply(this, arguments);
  }

}
