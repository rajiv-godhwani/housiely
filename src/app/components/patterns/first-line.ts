import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';

export class FirstLine implements PatternSearch{
    markedCells: Cell[] = Array();

    isEnabled: boolean;

    firstLineCellsMap = new Map()

    init(tickets: Ticket[]) {
        tickets.forEach(ticket=>{
            let firstLineCells = ticket.cells.slice(0,9).filter(c=> !c.isEmpty)
            this.firstLineCellsMap.set(ticket,firstLineCells)

            console.log("Pattern => ",firstLineCells.join(','))
        })
    }
    
    onUpdate(ticket: Ticket, lastNumber: number): boolean {
        let firstLineCells: Array<Cell> = this.firstLineCellsMap.get(ticket)
        let index = firstLineCells.map(c=> c.value).indexOf(lastNumber)
        if(index > -1){
            var cell = firstLineCells.splice(index,1)
            this.markedCells.push(cell[0])
        }
        return firstLineCells.length == 0;
    }

    reason(): Cell[] {
        return this.markedCells
    }

}