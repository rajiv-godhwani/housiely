import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { tick } from '@angular/core/testing';

export class BadeMiyan implements PatternSearch{
    markedCells = Array()

    isEnabled = true

    patternCellMap = new Map()

    init(tickets: Array<Ticket>){
        tickets.forEach(ticket=>{
            var filteredCell = ticket.cells.filter(c=> c.value > 45)
            this.patternCellMap.set(ticket,filteredCell)

            console.log("Pattern => "+filteredCell.map(c=> c.value).join(','))
        })
    }

    onUpdate(ticket:Ticket,lastNumber: number):boolean{
        let patternCells = this.patternCellMap.get(ticket)
        let index = patternCells.map(c=> c.value).indexOf(lastNumber)

        if(index != -1){
            var cell = patternCells.splice(index,1)
            this.markedCells.push(cell[0])
        }

        return patternCells.length == 0
    }

    reason():Array<Cell>{
        return this.markedCells
    }

    friendlyName():string{
      return "Bade miyan"   
    }
}