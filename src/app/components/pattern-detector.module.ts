import { PatternSearch } from './pattern-contract';
import { Ticket } from '../model/ticket.model';
import { Cell } from '../model/cell.model';
import { Type } from '@angular/compiler';
import { PatternAnnouncerService } from '../services/pattern-announcer';

export class PatternDetector{

    patterns: Array<PatternSearch>;
    tickets : Array<Ticket>
    detectedPatterns = new Map()


    constructor(allPatterns : Array<PatternSearch>,allTickets : Array<Ticket>,
        private patternAnnouncer:PatternAnnouncerService){
        this.patterns = allPatterns;
        this.tickets = allTickets;

        this.patterns.forEach(p=> p.init(this.tickets))
    }

    onNumberAnnounce(number: number){
        for(let ticket of this.tickets){
            let isDirty = false;
            for(let cell of ticket.cells){
                if(cell.value == number){
                    cell.isMarked = true
                    isDirty = true;
                    break
                }
            }
            // If isDirty run patterns
            if(isDirty){
                for(let pattern of this.patterns.filter(p=> !this.isPatternDetected(ticket,p))){
                    let result = pattern.onUpdate(ticket,number)
                    if(result){
                        this.setDetected(ticket,pattern)
                        this.patternAnnouncer.emitPattern(pattern)
                        console.log('Detected : ' + pattern.constructor.name+' => '+this.printCells(pattern.reason()))
                    }
                }
            }
        }
    }

    setDetected(ticket:Ticket, pattern: PatternSearch){
        if(this.detectedPatterns.has(ticket)){
            let patterns : Array<PatternSearch> = this.detectedPatterns.get(this.detectedPatterns)
            if(patterns == null){
                patterns = []
            }
                patterns.push(pattern)
        }else{
            this.detectedPatterns.set(ticket,[pattern])
        }
    }

    isDetected(ticket:Ticket,patternName: string){
        if(this.detectedPatterns.has(ticket)){
            let patterns : Array<PatternSearch> = this.detectedPatterns.get(ticket)
            for(let pattern of patterns){
                if(pattern.constructor.name == patternName)
                    return true
            }
        }
        return false;
    }

    isPatternDetected(ticket:Ticket,patterntoSearch: PatternSearch):boolean{
        if(this.detectedPatterns.has(ticket)){
            let patterns : Array<PatternSearch> = this.detectedPatterns.get(ticket)
            for(let pattern of patterns){
                if(pattern == patterntoSearch){
                    return true
                }
            }
            return false
        }
        return false;
    }

    printCells(cells:Array<Cell>):string{
        let printString = '['
        cells.forEach(cell=>printString+=cell.value+',')
        printString= printString.slice(0,-1)
        printString+=']'
        return printString
    }

}