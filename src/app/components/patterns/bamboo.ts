import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { tick } from '@angular/core/testing';

export class Bamboo implements PatternSearch{
    markedCells = Array()

    isEnabled = true

    bambooCellsMap = new Map()

    init(tickets: Array<Ticket>){
        tickets.forEach(ticket=>{
            let bambooCells = []
            let firstLine = ticket.cells.slice(0,9).filter(c=> !c.isEmpty)
            let secondLine = ticket.cells.slice(9,18).filter(c=> !c.isEmpty)
            let thirdLine = ticket.cells.slice(18,27).filter(c=> !c.isEmpty)
            bambooCells.push(firstLine[2])
            bambooCells.push(secondLine[2])
            bambooCells.push(thirdLine[2])
            this.bambooCellsMap.set(ticket,bambooCells)

            console.log("Pattern => "+bambooCells.map(c=> c.value).join(','))
        })
    }

    onUpdate(ticket:Ticket,lastNumber: number):boolean{
        let bambooCells: Array<Cell> = this.bambooCellsMap.get(ticket)
        let index = bambooCells.map(c=> c.value).indexOf(lastNumber)
        if(index > -1){
            var cell = bambooCells.splice(index,1)
            this.markedCells.push(cell[0])
        }
        return bambooCells.length == 0;
    }

    reason():Array<Cell>{
        return this.markedCells
    }

    friendlyName():string{
      return "Bamboo"   
    }
}