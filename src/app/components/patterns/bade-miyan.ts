import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { BasePattern } from './base-pattern';

export class BadeMiyan extends BasePattern {

    patternCells(ticket: Ticket): Cell[] {
        return ticket.cells.filter(c => c.value > 45)
    }

    friendlyName(): string {
        return "Bade miyan"
    }
}