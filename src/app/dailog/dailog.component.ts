import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DailogComponent {

constructor(public dialog: MatDialog){

}

openDialog() {
  this.dialog.open(DailogComponent);
}

}
