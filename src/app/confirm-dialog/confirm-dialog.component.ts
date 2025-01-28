import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(private dilogref:MatDialogRef<ConfirmDialogComponent>){

  }

  onConfirm(){

      this.dilogref.close(true)

  }

}
