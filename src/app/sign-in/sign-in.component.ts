import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  token: any;

  constructor(private router: Router,private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    console.log(this.token,"[p[p[p[p[p[p[p[p[p[p[")
    if (this.token) {
      this.router.navigateByUrl('/Home'); // Redirect to home if token exists
    } else {
      this.router.navigateByUrl('/SignIn'); // Redirect to sign-in if no token
    }
    
 
  }

  isSubmitted: boolean = false;
  signInForm: signInForm = new signInForm();

  @ViewChild("signInForm")
  signinForm!: NgForm;

  

  SignIn(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.signIn(this.signInForm).subscribe(async data => {
        if (data != null) {
          if (data != null) {
            var resultData = data
            console.log(resultData,"90909090909090909")
            if (resultData != null) {
              localStorage.setItem('token', resultData.body.access);
              this.toastr.success("Login Succesfull");
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/SignIn']);
          }, 500);
        });
    }
  }
}
export class signInForm {
  username: string = "";
  password: string = "";
}