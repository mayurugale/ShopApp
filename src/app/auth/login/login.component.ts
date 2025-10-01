import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login:FormGroup
  hide = true;
  loading = false;
  errorMessage = '';


  constructor(
    public fb:FormBuilder,
    public router:Router,
    public spinner:NgxSpinnerService,
    private AuthService:AuthService
  ){

    this.login=this.fb.group({

      email:['',Validators.required],
      password:['',[Validators.required]]

    })
  }


  get f(){
    return this.login.controls
  }

  userLogin(){
    if (this.login.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.login.value;

    this.AuthService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/'])
        console.log('Login success:', res);
        console.log('Stored token:', this.AuthService.getToken());
        // 👉 You can navigate to dashboard after login
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
      }
    });

  //  const username=this.login.get('username')?.value
  //  const pass=this.login.get('pass')?.value

  //  if(username=='mayur' && pass=='789'){

  //   //alert('login Succesfully')
  //   sessionStorage.setItem('username',username);
  //   sessionStorage.setItem('password',pass)
  //      this.router.navigate(['/'])

  //   //this.spinner.show()

    // setTimeout(() => {
      
    //   this.spinner.hide()

    // }, 10000);


    // setTimeout(() => {
      
    //   // sessionStorage.removeItem(username)
    //   // sessionStorage.removeItem(pass)
    // }, 10000);

  //  }else{

  //   alert('Username & Password not matched')

  //  }

    console.log(this.login.value)

  }

}
