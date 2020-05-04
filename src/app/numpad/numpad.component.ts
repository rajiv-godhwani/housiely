import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NumpadService } from '../services/numpad-service';

@Component({
    selector : "numpad",
    templateUrl : "./numpad.component.html",
    styleUrls:['./numpad.component.css']
})
export class NumpadComponent{

    constructor(private numPadService: NumpadService){
    }

    onNumberEnter(number){
        if(number == '✕'){
            number = -1
        }
        if(number == '⤶'){
            number = -2
        }
        this.numPadService.emitNumber(number)
    }

}