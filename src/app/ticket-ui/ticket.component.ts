import { Component, Input, Output } from '@angular/core';
import { Ticket } from '../model/ticket.model';
import { EventEmitter } from 'protractor';
import { NumpadService } from '../services/numpad-service';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent {
  @Input() cells = Array(27)
  inputMode = true

  selectedCell:number = -1
  markedCell:Array<number> = []
  private subscription

  constructor(private numberService:NumpadService){
      this.subscription = this.numberService.getNumber().subscribe(num=> this.onNumberChange(num))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getClass(cell,index){
    var classes = []
    if(this.isEmpty(cell)){
        classes.push('empty')
    }else{
        classes.push('filled')
    }
    if(index == this.selectedCell){
        classes.push('selected')
    }
    if(this.markedCell.indexOf(Number(cell)) > -1){
        classes.push('marked')
    }
    return classes.join(' ')
  }

  onCellSelect(cellIndex:number){
      if(!this.inputMode){
          return
      }
      this.selectedCell = cellIndex
      if(this.cells[this.selectedCell] == undefined){
        this.cells[this.selectedCell] = ''
      }
  }

  isEmpty(value):boolean{
      return value == 0 || value == undefined || value == '';
  }

  onNumberChange(number){
      if(this.selectedCell > -1){
        
        if(number == -1){
            this.cells[this.selectedCell] = ''
            this.selectedCell = -1    
        }
        else if(number == -2){
            this.selectedCell = -1
        }else{
            this.cells[this.selectedCell] += number.toString()
            if(this.cells[this.selectedCell].length >2){
                this.cells[this.selectedCell] = number.toString()
            }

            if(this.cells[this.selectedCell].length == 2){
                this.selectedCell = -1;
            }
        }
      }
  }

  onNumberAnnounce(num: number){
      this.markedCell.push(num)
  }

  onInputModeChange(mode){
    this.inputMode = mode
    if(!this.inputMode){
        // Clear selection
        this.selectedCell = -1
    }
  }
}
