import { Cell } from './cell.model';

export class Ticket{
    cells : Array<Cell>;

    constructor(cells:Array<number>){
        this.cells = Array()

        cells.forEach(num=>{
            let cell = new Cell()
            cell.value = num == undefined ? 0: num
            cell.isEmpty = num === 0 || num == undefined
            this.cells.push(cell)
        })
    }
}