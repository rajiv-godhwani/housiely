import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';

export class ThirdLine implements PatternSearch{
    markedCells: Cell[] = Array();

    isEnabled: boolean;

    thirdLineCellsMap = new Map()

    init(tickets: Ticket[]) {
        tickets.forEach(ticket=>{
            let thirdLineCells = ticket.cells.slice(18,27).filter(c=> !c.isEmpty)
            this.thirdLineCellsMap.set(ticket,thirdLineCells)

            console.log("Pattern => ",thirdLineCells.map(c=> c.value).join(','))
        })
    }
    
    onUpdate(ticket: Ticket, lastNumber: number): boolean {
        let thirdLineCells: Array<Cell> = this.thirdLineCellsMap.get(ticket)
        let index = thirdLineCells.map(c=> c.value).indexOf(lastNumber)
        if(index > -1){
            var cell = thirdLineCells.splice(index,1)
            this.markedCells.push(cell[0])
        }
        return thirdLineCells.length == 0;
    }

    reason(): Cell[] {
        return this.markedCells
    }

    friendlyName():string{
        return "3rd Line"   
      }

}