import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { tick } from '@angular/core/testing';

export class Star implements PatternSearch{
    markedCells = Array()

    isEnabled = true

    starCells = new Map()

    init(tickets: Array<Ticket>){
        tickets.forEach(ticket=>{
            let starCells = []
            let firstLine = ticket.cells.slice(0,9).filter(c=> !c.isEmpty)
            let secondLine = ticket.cells.slice(9,18).filter(c=> !c.isEmpty)
            let thirdLine = ticket.cells.slice(18,27).filter(c=> !c.isEmpty)
            starCells.push(firstLine[0])
            starCells.push(firstLine[firstLine.length-1])
            starCells.push(secondLine[2])
            starCells.push(thirdLine[0])
            starCells.push(thirdLine[thirdLine.length-1])
            this.starCells.set(ticket,starCells)

            console.log("Pattern => "+starCells.map(c=> c.value).join(','))
        })
    }

    onUpdate(ticket:Ticket,lastNumber: number):boolean{
        let starCells: Array<Cell> = this.starCells.get(ticket)
        let index = starCells.map(c=> c.value).indexOf(lastNumber)
        if(index > -1){
            var cell = starCells.splice(index,1)
            this.markedCells.push(cell[0])
        }
        return starCells.length == 0;
    }

    reason():Array<Cell>{
        return this.markedCells
    }

    friendlyName():string{
        return "Star"   
    }
}