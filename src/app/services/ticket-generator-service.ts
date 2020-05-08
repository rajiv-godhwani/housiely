import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Injectable({
    providedIn: 'root'
})
export class TicketGenerator{

  
  constructor(private http:HttpClient) { }

  public generate(number: number) : Observable<any> {
    return this.http.get('https://www.mocky.io/v2/5eb50f950e00004d5a081f12',{ responseType : 'text'}).pipe(
      map(data=>{
        var json 
        var flatTickets = []
        xml2js.parseString(data,function(e,r){
          json = r
        })
        json.tickets.message[0].ticketpage[0].ticket.forEach(tkt => {
          var cells = []
          cells = cells.concat(tkt.row1[0].split('-').map(Number))
          cells = cells.concat(tkt.row2[0].split('-').map(Number))
          cells = cells.concat(tkt.row3[0].split('-').map(Number))
          flatTickets.push(cells)
        });
        flatTickets.splice(number-6)
        return flatTickets
      }
      )
    )
    
  }

}