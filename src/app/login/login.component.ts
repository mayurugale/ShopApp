import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login:FormGroup
  hide = true;


  constructor(public fb:FormBuilder,public router:Router,public spinner:NgxSpinnerService){

    this.login=this.fb.group({

      username:['',Validators.required],
      pass:['',[Validators.required]]

    })
  }


  get f(){

    return this.login.controls
  }

  userLogin(){

   const username=this.login.get('username')?.value
   const pass=this.login.get('pass')?.value

   if(username=='mayur' && pass=='789'){

    //alert('login Succesfully')
    sessionStorage.setItem('username',username);
    sessionStorage.setItem('password',pass)
       this.router.navigate(['/'])

    //this.spinner.show()

    // setTimeout(() => {
      
    //   this.spinner.hide()

    // }, 10000);


    // setTimeout(() => {
      
    //   // sessionStorage.removeItem(username)
    //   // sessionStorage.removeItem(pass)
    // }, 10000);

   }else{

    alert('Username & Password not matched')

   }

    console.log(this.login.value)

  }

}
