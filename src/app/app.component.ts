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
import { TicketGenerator } from './services/ticket-generator-service';
import { MatDialog } from '@angular/material/dialog';
import { TicketCountDialog } from './ticket-count-dialog/ticket-count-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tickets: Array<number[]> = []

  @ViewChildren(TicketComponent) ticketComp: QueryList<TicketComponent>

  patternDetector: PatternDetector
  patterns: Array<PatternSearch> = [new QuickSeven(), new Star(), new Bamboo(),
  new BadeMiyan(), new ChoteMiyan(),
  new FirstLine(), new SecondLine(), new ThirdLine(),
  new FullHouse()]


  announceNumber = ''

  patternSubscription
  numberSubscription

  speech = new Speech()


  constructor(private numpadSvc: NumpadService, private patternAncr: PatternAnnouncerService,
    private dialog: MatDialog, private ticketGenSvc: TicketGenerator) {
    if (this.speech.hasBrowserSupport()) {
      this.speech.init()
    }

  }

  ngAfterViewInit() {
    this.ticketComp.changes.subscribe(() => setTimeout(() => this.onPlay()))
  }

  onNgDestroy() {
    this.numberSubscription.unsubscribe()
  }

  onTicketAdd() {
    this.dialog.open(TicketCountDialog, {
      data: { count: 1 }
    }).afterClosed().subscribe(count => {
      if (count > 0) {
        this.ticketGenSvc.generate(count).subscribe(tickets => {
          this.tickets = tickets
        });
      }
    }
    )

  }


  onPlay() {
    if (this.patternSubscription) {
      this.patternSubscription.unsubscribe()
    }

    this.patterns.forEach(p => p.isEnabled = true)

    let allTickets = new Array<Ticket>()
    this.ticketComp.forEach(tkt => allTickets.push(new Ticket(tkt.cells)))

    this.patternDetector = new PatternDetector(this.patterns, allTickets, this.patternAncr)
    this.patternSubscription = this.patternAncr.announcer().subscribe(p => {
      this.speech.speak({ text: p.friendlyName() })
      this.shoot()
      this.shoot()
    })

    this.numberSubscription = this.numpadSvc.getNumber().subscribe(num => this.patternDetector.onNumberAnnounce(num))
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
    } catch (e) {
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
