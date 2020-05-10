import { PatternSearch } from '../pattern-contract';
import { Cell } from '../../model/cell.model';
import { Ticket } from 'src/app/model/ticket.model';
import { tick } from '@angular/core/testing';
import { BasePattern } from './base-pattern';

export class Bamboo extends BasePattern {

    patternCells(ticket: Ticket): Cell[] {
        let bambooCells = []
        let firstLine = ticket.cells.slice(0, 9).filter(c => !c.isEmpty)
        let secondLine = ticket.cells.slice(9, 18).filter(c => !c.isEmpty)
        let thirdLine = ticket.cells.slice(18, 27).filter(c => !c.isEmpty)
        bambooCells.push(firstLine[2])
        bambooCells.push(secondLine[2])
        bambooCells.push(thirdLine[2])
        return bambooCells
    }

    friendlyName(): string {
        return "Bamboo"
    }
}