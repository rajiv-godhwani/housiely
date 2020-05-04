import { Ticket } from "../model/ticket.model";
import { Cell } from '../model/cell.model';
import { PatternDetector } from './pattern-detector.module';
import { QuickSeven } from './patterns/quick-seven';
import { PatternSearch } from './pattern-contract';
import { Star } from './patterns/star';
import { Bamboo } from './patterns/bamboo';
import { FirstLine } from './patterns/first-line';
import { SecondLine } from './patterns/second-line';
import { ThirdLine } from './patterns/third-line';
import { FullHouse } from './patterns/full-house';

describe('Pattern Detector',()=>{
    var patternDetector;
    var tickets;
    beforeEach(()=>{
        let cells = [0,11,0,34,0,55,0,70,80,
            6,0,27,0,49,0,0,76,87,
            0,15,28,35,0,56,67,0,0]
        let ticket = new Ticket(cells)
        let patterns = [
            new QuickSeven() ,new Star(),new Bamboo(),
            new FirstLine(),new SecondLine(),new ThirdLine(),
            new FullHouse()
        ]
        tickets = [ticket]
        patternDetector = new PatternDetector(patterns,tickets,null)
    })

    it('should detect quick 7',()=>{
  

        patternDetector.onNumberAnnounce(11)
        patternDetector.onNumberAnnounce(34)
        patternDetector.onNumberAnnounce(27)
        patternDetector.onNumberAnnounce(6)
        patternDetector.onNumberAnnounce(49)
        patternDetector.onNumberAnnounce(76)
        patternDetector.onNumberAnnounce(15)
    
       expect(patternDetector.isDetected(tickets[0],QuickSeven.name)).toEqual(true)
    
      
    
        patternDetector.onNumberAnnounce(28)
    
        patternDetector.onNumberAnnounce(70)
    
    
    })

    it('should detect star pattern',()=>{

        patternDetector.onNumberAnnounce(11)
        patternDetector.onNumberAnnounce(34)
        patternDetector.onNumberAnnounce(27)
        patternDetector.onNumberAnnounce(6)
        patternDetector.onNumberAnnounce(49)
        patternDetector.onNumberAnnounce(76)
        patternDetector.onNumberAnnounce(15)
        patternDetector.onNumberAnnounce(55)
        patternDetector.onNumberAnnounce(56)
        patternDetector.onNumberAnnounce(67)
        patternDetector.onNumberAnnounce(87)
        patternDetector.onNumberAnnounce(35)
        patternDetector.onNumberAnnounce(80)
    
        expect(patternDetector.isDetected(tickets[0],Star.name)).toEqual(true)
    })
    
    it('should detect bamboo pattern',()=>{

        patternDetector.onNumberAnnounce(71)
        patternDetector.onNumberAnnounce(61)
        patternDetector.onNumberAnnounce(49)//
        patternDetector.onNumberAnnounce(77)
        patternDetector.onNumberAnnounce(10)
        patternDetector.onNumberAnnounce(55)//
        patternDetector.onNumberAnnounce(43)
        patternDetector.onNumberAnnounce(9)
        patternDetector.onNumberAnnounce(18)
        patternDetector.onNumberAnnounce(35)//
    
        expect(patternDetector.isDetected(tickets[0],Bamboo.name)).toEqual(true)
    })

    it('should detect first line pattern',()=>{

        patternDetector.onNumberAnnounce(71)
        patternDetector.onNumberAnnounce(80)//
        patternDetector.onNumberAnnounce(11)//
        patternDetector.onNumberAnnounce(77)
        patternDetector.onNumberAnnounce(10)
        patternDetector.onNumberAnnounce(34)//
        patternDetector.onNumberAnnounce(43)
        patternDetector.onNumberAnnounce(70)//
        patternDetector.onNumberAnnounce(18)
        patternDetector.onNumberAnnounce(55)//
    
        expect(patternDetector.isDetected(tickets[0],FirstLine.name)).toEqual(true)
    })

    it('should detect second line pattern',()=>{

        patternDetector.onNumberAnnounce(71)
        patternDetector.onNumberAnnounce(80)//
        patternDetector.onNumberAnnounce(11)//
        patternDetector.onNumberAnnounce(77)
        patternDetector.onNumberAnnounce(10)
        patternDetector.onNumberAnnounce(34)//
        patternDetector.onNumberAnnounce(43)
        patternDetector.onNumberAnnounce(70)//
        patternDetector.onNumberAnnounce(18)
        patternDetector.onNumberAnnounce(55)//
    
        expect(patternDetector.isDetected(tickets[0],FirstLine.name)).toEqual(true)
    })

})




