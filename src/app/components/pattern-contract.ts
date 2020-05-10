import { Cell } from '../model/cell.model';
import { Ticket } from '../model/ticket.model';

export interface PatternSearch{
    
    markedCells : Map<Ticket,Array<Cell>>

    isEnabled : boolean;

    init(tickets:Array<Ticket>);

    onUpdate(ticket:Ticket,lastNumber: number):boolean;
    
    reason(ticket:Ticket):Array<Cell>;

    friendlyName():string;

}