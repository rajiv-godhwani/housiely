import { Component, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector : "ticket-count",
    templateUrl : "ticket-count-dialog.html",
    styleUrls : ["ticket-count-dialog.scss"]
})
export class TicketCountDialog{

    constructor(
        public dialogRef: MatDialogRef<TicketCountDialog>,
        @Inject(MAT_DIALOG_DATA) public data ) {}
    
    onNoClick(): void {
        this.dialogRef.close();
    }
}