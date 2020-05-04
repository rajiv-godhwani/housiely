import { PatternSearch } from '../pattern-contract';
import { Ticket } from 'src/app/model/ticket.model';
import { Cell } from 'src/app/model/cell.model';

export class FullHouse implements PatternSearch{

    markedCells: Cell[];

    isEnabled: boolean;

    init(tickets:Array<Ticket>){

    }

    onUpdate(ticket:Ticket,lastNumber: number):boolean{
        var markCount = 0
        ticket.cells.forEach(c=> {
            if(c.isMarked){
                markCount++
            }
        })

        this.markedCells = ticket.cells
        return markCount == 15;
    }
    
    reason():Array<Cell>{
        return this.markedCells
    }
}