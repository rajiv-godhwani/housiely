import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { tick } from '@angular/core/testing';
import { BasePattern } from './base-pattern';

export class ChoteMiyan extends BasePattern {
    patternCells(ticket: Ticket): Cell[] {
        return ticket.cells.filter(c => c.value <= 45 && c.value > 0)
    }

    friendlyName(): string {
        return "Chote miyan"
    }
}