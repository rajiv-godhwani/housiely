import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NumpadService{
    private number = new Subject<number>()

    getNumber() : Observable<number>{
        return this.number.asObservable();
    }

    emitNumber(num){
        this.number.next(num)
    }
}