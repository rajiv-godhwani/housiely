import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { BasePattern } from './base-pattern';

export class QuickSeven extends BasePattern {

    patternCells(ticket: Ticket): Cell[] {
        return []
    }

    onUpdate(ticket: Ticket, lastNumber: number): boolean {
        this.pushMarkedCells(ticket,ticket.cells.find(c=> c.value == lastNumber))
        return this.markedCells.get(ticket).length >= 7;
    }


    friendlyName(): string {
        return "Quick 7"
    }

}