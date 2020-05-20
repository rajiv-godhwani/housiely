import { BasePattern } from './base-pattern';
import { Ticket } from 'src/app/model/ticket.model';
import { Cell } from 'src/app/model/cell.model';

export class Twins extends BasePattern {

    patternCells(ticket: Ticket): Cell[] {
        return []
    }

    onUpdate(ticket: Ticket, number: number): boolean {
        let pair1 = new Map<number, Cell>()
        let pair2 = new Map<number, Cell>()
        let tempPair = pair1

        let index = 0
        ticket.cells.forEach(c => {
            if (c.isMarked) {
                // Insert 1, insert second if consecutive index
                if (tempPair.has(index - 1) || tempPair.size == 0) {
                    tempPair.set(index, c)
                }else{
                    tempPair.clear()
                    tempPair.set(index, c)
                }
            }
            if (pair1.size == 2 && pair2.size != 2) {
                tempPair = pair2
            }else if(pair1.size == 2 && pair2.size == 2){
                return
            }
            // Break the pair if new row will start
            if(index == 8 || index == 17){
                tempPair.clear()
            }
            index++
            
        })

        if(pair1.size ==2 && pair2.size == 2){
            var cells = []
            for(let cell of pair1.values()){
                cells.push(cell)
            }
            for(let cell of pair2.values()){
                cells.push(cell)
            }
            this.markedCells.set(ticket,cells)
            return true
        }
        return false

    }
    friendlyName(): string {
        return "Twins"
    }

}