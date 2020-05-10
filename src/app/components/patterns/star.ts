import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { tick } from '@angular/core/testing';
import { BasePattern } from './base-pattern';

export class Star extends BasePattern {

    patternCells(ticket: Ticket): Cell[] {
        let starCells = []
        let firstLine = ticket.cells.slice(0, 9).filter(c => !c.isEmpty)
        let secondLine = ticket.cells.slice(9, 18).filter(c => !c.isEmpty)
        let thirdLine = ticket.cells.slice(18, 27).filter(c => !c.isEmpty)
        starCells.push(firstLine[0])
        starCells.push(firstLine[firstLine.length - 1])
        starCells.push(secondLine[2])
        starCells.push(thirdLine[0])
        starCells.push(thirdLine[thirdLine.length - 1])
        return starCells
    }

    friendlyName(): string {
        return "Star"
    }
}