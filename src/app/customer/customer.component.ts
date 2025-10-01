import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerdetailsComponent } from '../customerdetails/customerdetails.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../services/common.service';


export interface UserData {
  _id: string;
  
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  UserData: UserData[] = []; 
  displayedColumns: string[] = ['_id', 'name', 'mobileNo', 'address','action'];
  dataSource = new MatTableDataSource<UserData>(this.UserData); // Initialize with an empty array

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dilog:MatDialog,private router:Router,private spinner:NgxSpinnerService,private common:CommonService){

    
    //alert('spinner')
  
      this.common.getCustomers().subscribe((res:any)=>{

        this.dataSource=res;
        console.log(this.dataSource)

      })

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

  ngOnInit(){

      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide()
      }, 1000);
  }
  openPop(){

    const dilogRef=this.dilog.open(CustomerdetailsComponent,{

      width:'700px',
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

            this.spinner.show()
             this.common.DeleteUser(row._id).subscribe(
              ()=>{

                this.UserData = this.UserData.filter(user => user._id !== row._id);
                this.dataSource.data = [...this.UserData];
                this.spinner.hide(); // Hide spinner
                //alert('User deleted successfully!');
              },
              (error) => {
                this.spinner.hide();
                alert('Error deleting user: ' + error.message);
              }
            )
               
      }

    });

  }
  

  LogOut(){

  sessionStorage.clear();
  this.router.navigate(['/login'])

  }

}








