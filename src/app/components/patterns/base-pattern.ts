import { PatternSearch } from '../pattern-contract';
import { Ticket } from 'src/app/model/ticket.model';
import { Cell } from 'src/app/model/cell.model';

export abstract class BasePattern implements PatternSearch {
    markedCells

    patternCellMap = new Map<Ticket, Array<Cell>>()

    isEnabled: boolean = true;

    init(tickets: Ticket[]) {
        this.markedCells = new Map<Ticket, Array<Cell>>()
        tickets.forEach(ticket => this.patternCellMap.set(ticket, this.patternCells(ticket)))
    }

    abstract patternCells(ticket: Ticket): Array<Cell>;


    onUpdate(ticket: Ticket, lastNumber: number): boolean {
        let patternCells = this.patternCellMap.get(ticket)
        let index = patternCells.map(c => c.value).indexOf(lastNumber)

        if (index != -1) {
            var cell = patternCells.splice(index, 1)
            this.pushMarkedCells(ticket, cell[0])
        }

        return patternCells.length == 0
    }

    reason(ticket: Ticket): Cell[] {
        return this.markedCells.get(ticket)
    }

    abstract friendlyName(): string;

    protected pushMarkedCells(ticket: Ticket, markedCell: Cell) {
        if (!this.markedCells.has(ticket)) {
            this.markedCells.set(ticket, [])
        }
        this.markedCells.get(ticket).push(markedCell)
    }
}