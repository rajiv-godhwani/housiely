import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';

export class QuickSeven implements PatternSearch{

    markedCells = Array()

    isEnabled = true

    init(tickets: Array<Ticket>){
    }

    onUpdate(ticket:Ticket, lastNumber: number):boolean{
        this.markedCells = []
        ticket.cells.forEach(cell => {
            if(cell.isMarked){
             this.markedCells.push(cell)
            }
        });

        return this.markedCells.length >= 7;
    }

    reason():Array<Cell>{
        return this.markedCells
    }

    friendlyName():string{
        return "Quick 7"   
    }

}