import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerdetailsComponent } from '../customerdetails/customerdetails.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';


export interface UserData {
  gid: string;
  cust_name: string;
  mb_no: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  id_proof: string;
  book_color: string;
  middle_per_name: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  UserData: UserData[] = []; 
  displayedColumns: string[] = ['gid', 'cust_name', 'mb_no', 'street', 'city', 'state', 'zipCode', 'id_proof', 'book_color', 'middle_per_name','action'];
  dataSource = new MatTableDataSource<UserData>(this.UserData); // Initialize with an empty array

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dilog:MatDialog,private router:Router){   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPop(){

    const dilogRef=this.dilog.open(CustomerdetailsComponent,{

      width:'500px',
      height:'600px'

    })
    dilogRef.afterClosed().subscribe((result) => {

      if(result){

         // alert('test')
        this.UserData.push(result)
       // console.log(this.UserData.values);
        this.dataSource.data = [...this.UserData]; 
        console.log('Data added:', this.UserData);

      }

      //console.log('The dialog was closed',result);
    });

  }

  DelData(row:UserData){

    const dilogRefe=this.dilog.open(ConfirmDialogComponent,{

      width:'500px'
    })

    dilogRefe.afterClosed().subscribe((deltent)=>{
   // const usr=result;
      // console.log(usr);
          if(deltent == true){
        console.log("test successfykky")
        const index=this.UserData.indexOf(row)
        if(index >=0){
        this.UserData.splice(index,1)
        this.dataSource.data=[...this.UserData]
            }
      }

    });

  }

  LogOut(){

  sessionStorage.clear();
  this.router.navigate(['/login'])

  }

}








