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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
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

  constructor(private numpadSvc: NumpadService,private patternAncr : PatternAnnouncerService){
    if(this.speech.hasBrowserSupport()){
      this.speech.init()
    }
  }

  onModeButtonClick(){
    console.log('Mode changed')
    if(this.mode == 'Input'){
      this.mode = 'Play'
      this.ticketComp.forEach(tkt => tkt.onInputModeChange(true))
      
      
    }else{
      this.mode = 'Input'
      this.ticketComp.forEach(tkt => tkt.onInputModeChange(false))
      this.onPlay()
      
    }
  }

  onTicketAdd(){
    this.tickets.push([undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
                      undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
                      undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined])
  }

  onPlayDisabled(){
    if(this.numpadSubscription){
      this.numpadSubscription.unsubscribe()
    }
    this.patternDetector = undefined

  }

  onPlay(){
    let allTickets = new Array<Ticket>()
    this.ticketComp.forEach(tkt=> {
      allTickets.push(new Ticket(tkt.cells))
    })

    let patterns = [
      new QuickSeven() ,new Star(),new Bamboo(),
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
    console.log("Announced number "+number)
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
      console.error(e)
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  confetti(args: any) {
    return window['confetti'].apply(this, arguments);
  }

}
