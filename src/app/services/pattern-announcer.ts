import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PatternSearch } from '../components/pattern-contract';

@Injectable()
export class PatternAnnouncerService{
    private patternSubject = new Subject<PatternSearch>()

    announcer() : Observable<PatternSearch>{
        return this.patternSubject.asObservable();
    }

    emitPattern(pattern:PatternSearch){
        this.patternSubject.next(pattern)
    }
}