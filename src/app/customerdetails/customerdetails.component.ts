import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent {

  Customer:FormGroup


constructor(public fb:FormBuilder,public router:Router,public dilog:MatDialogRef<CustomerComponent>,public common:CommonService){

  
  this.Customer=this.fb.group({


    guid:[{ value: '11', disabled: true }],
    name:['',[Validators.required]],
    mobileNo:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
    address:this.fb.group({
    street:['',Validators.required],
    city:['',Validators.required],
    state:['',Validators.required],
    zipCode:['',[Validators.required,Validators.pattern(/^\d{6}$/)]],
    }),
    
    idProof:['',Validators.required],
    idProofValue:['',Validators.required],
    bookColour:['',Validators.required],
    middlePerson:['']

  })

}

get f(){

  return this.Customer.controls

}


addData(){


    this.common.addCust(this.Customer.value).subscribe((res:any)=>{

      alert('Customer added successfully!');
      this.Customer.reset();
      this.dilog.close(this.Customer.value)
    },
  )
  

}


}
