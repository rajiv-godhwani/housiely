import { Component, Input, Output } from '@angular/core';
import { Ticket } from '../model/ticket.model';
import { EventEmitter } from 'protractor';
import { NumpadService } from '../services/numpad-service';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketComponent {
  @Input() cells = Array(27)

  markedCell:Array<number> = []

  constructor(private numpadSvc: NumpadService){
  }


  getClass(cell,index){
    var classes = []
    if(this.isEmpty(cell)){
        classes.push('empty')
    }else{
        classes.push('filled')
    }

    if(this.markedCell.indexOf(Number(cell)) > -1){
        classes.push('marked')
    }
    return classes.join(' ')
  }

  onCellSelect(cellIndex:number){
    if(this.cells[cellIndex]!=0){
        if(this.markedCell.indexOf(this.cells[cellIndex]) > -1){
          this.markedCell.splice(this.markedCell.indexOf(this.cells[cellIndex]),1)
        }else{
          this.markedCell.push(this.cells[cellIndex])
          this.numpadSvc.emitNumber(this.cells[cellIndex])
        }
    }
  }

  isEmpty(value):boolean{
      return value == 0 || value == undefined || value == '';
  }

  onNumberAnnounce(num: number){
      this.markedCell.push(num)
  }

}
