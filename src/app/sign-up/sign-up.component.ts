import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // signupForm: any = {}; 
  isSubmitted: boolean = false;
  signUpForm: signUpForm = new signUpForm();

  @ViewChild("signUpForm")
  signupForm!: NgForm;

  constructor(private router: Router,private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
 
  }

  SignUp(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.signUp(this.signUpForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data
            if (resultData != null) {
              this.toastr.success("Registration Succesfull");
              setTimeout(() => {
                this.router.navigate(['/SignIn']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/SignUp']);
          }, 500);
        });
    }
  }
}
export class signUpForm {
  username: string = "";
  email: string = "";
  password: string = "";
}