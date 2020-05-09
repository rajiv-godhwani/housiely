import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PatternSearch } from '../pattern-contract';

@Component({
    selector:'pattern-board',
    templateUrl:'pattern-board.component.html',
    styleUrls:['pattern-board.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PatternBoard{

    @Input() patterns : PatternSearch[]
    
}