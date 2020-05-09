import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PatternSearch } from '../components/pattern-contract';
import { Ticket } from '../model/ticket.model';

@Injectable()
export class PatternAnnouncerService{
    private patternSubject = new Subject<TicketPatternsWon>()

    announcer() : Observable<TicketPatternsWon>{
        return this.patternSubject.asObservable();
    }

    emitPattern(ticket:Ticket,patterns:PatternSearch[]){
        this.patternSubject.next(new TicketPatternsWon(ticket,patterns))
    }
}

export class TicketPatternsWon{

    constructor(public ticket:Ticket, public patterns:PatternSearch[]){

    }
}