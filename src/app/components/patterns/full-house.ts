import { PatternSearch } from '../pattern-contract';
import { Ticket } from 'src/app/model/ticket.model';
import { Cell } from 'src/app/model/cell.model';
import { BasePattern } from './base-pattern';

export class FullHouse extends BasePattern{

    patternCells(ticket: Ticket): Cell[] {
       return ticket.cells.filter(c=> c.value != 0)
    }

    friendlyName():string{
        return "Full House"   
      }
}