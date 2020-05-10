import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { BasePattern } from './base-pattern';

export class SecondLine extends BasePattern {

    patternCells(ticket: Ticket): Cell[] {
        return ticket.cells.slice(9, 18).filter(c => !c.isEmpty)
    }

    friendlyName(): string {
        return "2nd Line"
    }

}