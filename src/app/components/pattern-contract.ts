import { Cell } from '../model/cell.model';
import { Ticket } from '../model/ticket.model';

export interface PatternSearch{
    
    markedCells : Array<Cell>

    isEnabled : boolean;

    init(tickets:Array<Ticket>);

    onUpdate(ticket:Ticket,lastNumber: number):boolean;
    
    reason():Array<Cell>;

}