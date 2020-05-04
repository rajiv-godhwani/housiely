import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';

export class SecondLine implements PatternSearch{
    markedCells: Cell[] = Array();

    isEnabled: boolean;

    secondLineCellsMap = new Map()

    init(tickets: Ticket[]) {
        tickets.forEach(ticket=>{
            let secondLineCells = ticket.cells.slice(9,18).filter(c=> !c.isEmpty)
            this.secondLineCellsMap.set(ticket,secondLineCells)

            console.log("Pattern => ",secondLineCells.join(','))
        })
    }
    
    onUpdate(ticket: Ticket, lastNumber: number): boolean {
        let secondLineCells: Array<Cell> = this.secondLineCellsMap.get(ticket)
        let index = secondLineCells.map(c=> c.value).indexOf(lastNumber)
        if(index > -1){
            var cell = secondLineCells.splice(index,1)
            this.markedCells.push(cell[0])
        }
        return secondLineCells.length == 0;
    }

    reason(): Cell[] {
        return this.markedCells
    }

}