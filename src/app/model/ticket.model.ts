import { Cell } from './cell.model';

export class Ticket{
    cells : Array<Cell>;

    constructor(cells:Array<number>){
        this.cells = Array()

        cells.forEach(num=>{
            let cell = new Cell()
            cell.value = num == undefined || isNaN(parseInt(num.toString())) ? 0: Number(num)
            cell.isEmpty = cell.value == 0
            this.cells.push(cell)
        })

        console.log("Created ticket with "+this.cells.map(c=> c.value).join(','))
    }
}