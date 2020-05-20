import { Component, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ReflectiveInjector, ViewContainerRef, HostListener } from '@angular/core';
import { NumpadService } from './services/numpad-service';
import { TicketComponent } from './ticket-ui/ticket.component';
import { PatternDetector } from './components/pattern-detector.component';
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
import { BadeMiyan } from './components/patterns/bade-miyan';
import { ChoteMiyan } from './components/patterns/chote-miyan';
import { TicketGenerator } from './services/ticket-generator-service';
import { MatDialog } from '@angular/material/dialog';
import { TicketCountDialog } from './ticket-count-dialog/ticket-count-dialog';
import { PrizeDialog } from './components/prize-dialog/prize-dialog.component';
import { CanDeactivate } from '@angular/router';
import { Twins } from './components/patterns/twins';
import panzoom from 'panzoom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tickets: Array<number[]> = []

  @ViewChildren(TicketComponent) ticketComp: QueryList<TicketComponent>

  patternDetector: PatternDetector
  patterns: Array<PatternSearch> = [new QuickSeven(), new Star(), new Twins(), new Bamboo(),
  new BadeMiyan(), new ChoteMiyan(),
  new FirstLine(), new SecondLine(), new ThirdLine(),
  new FullHouse()]

  patternSubscription
  numberSubscription


  constructor(private numpadSvc: NumpadService, private patternAncr: PatternAnnouncerService,
    private dialog: MatDialog, private ticketGenSvc: TicketGenerator) { }

  @HostListener('window:beforeunload', ['$event'])
  onExit($event) {
    return $event.returnValue = window.confirm('Exit?');
  }

  ngAfterViewInit() {
    this.ticketComp.changes.subscribe(() => setTimeout(() => this.onPlay()))
    var pz = panzoom(document.getElementById('content'),{
      bounds: true,
      boundsPadding: 0.1,
      onTouch: function(e) {
        // `e` - is current touch event.
    
        return false; // tells the library to not preventDefault.
      }
    })
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

    if (this.numberSubscription) {
      this.numberSubscription.unsubscribe()
    }

    this.patterns.forEach(p => p.isEnabled = true)

    let allTickets = new Array<Ticket>()
    this.ticketComp.forEach(tkt => allTickets.push(new Ticket(tkt.cells)))

    this.patternDetector = new PatternDetector(this.patterns, allTickets, this.patternAncr)
    this.patternSubscription = this.patternAncr.announcer().subscribe(p => {
      this.dialog.open(PrizeDialog, { panelClass: 'prize-dialog', data: p, maxHeight: '82vw', minWidth: '300px', maxWidth: '300px' })
    })

    this.numberSubscription = this.numpadSvc.getNumber().subscribe(num => this.patternDetector.onNumberAnnounce(num))
  }




}
