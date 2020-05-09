import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TicketGenerator{

  
  constructor(private http:HttpClient) { }

  public generate(number: number) : Observable<any> {
    return this.http.get('https://1g3imvir8g.execute-api.ap-south-1.amazonaws.com/default/generateTickets')
    .pipe(map((d : [])=> {d.splice(number-6);  return d}))
  }

}