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

  constructor(private numpadSvc: NumpadService,private patternAncr : PatternAnnouncerService){

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
    // this.tickets.push([undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
    //                   undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
    //                   undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined])
    this.tickets.push([0,11,0,34,0,55,0,70,80,
                      6,0,27,0,49,0,0,76,87,
                      0,15,28,35,0,56,67,0,0])
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
      console.log(tkt.cells.join(','))
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
    })

  }

  onNumberAnnounce(number){
    
    if(number == -2 && Number(this.announceNumber) != NaN && Number(this.announceNumber) > 0){
      this.checkPattern(+this.announceNumber)
      this.announceNumber = ''
    }else{
      this.announceNumber += number.toString()
    }
    
  }

  checkPattern(number){
    console.log("Announced number "+number)
    this.patternDetector.onNumberAnnounce(number)
    this.ticketComp.forEach(tkt=> tkt.onNumberAnnounce(number))
  }

}
