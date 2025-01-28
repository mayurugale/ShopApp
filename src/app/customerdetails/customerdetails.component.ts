import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent {

  Customer:FormGroup


constructor(public fb:FormBuilder,public router:Router,public dilog:MatDialogRef<CustomerComponent>){


  
  this.Customer=this.fb.group({


    gid:[{ value: '11', disabled: true }],
    cust_name:['',[Validators.required]],
    mb_no:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
    street:['',Validators.required],
    city:['',Validators.required],
    state:['',Validators.required],
    zipCode:['',Validators.required],
    id_proof:['',Validators.required],
    book_color:['',Validators.required],
    middle_per_name:['']

  })

}

get f(){

  return this.Customer.controls

}


addData(){

  if(this.Customer.value){

  const storeData=this.Customer.value

  const objData={

    gid:storeData.gid,
    cust_name:storeData.cust_name,
    mb_no:storeData.mb_no,
    address:{

      street:storeData.street,
      city:storeData.city,
      state:storeData.state,
      zipcode:storeData.zipcode
    },
    id_proof:storeData.id_proof,
    book_color:storeData.book_color,
    middle_per_name:storeData.middle_per_name

  }
  console.log(objData);
  
    this.dilog.close(this.Customer.value)

  }
  


}


}
