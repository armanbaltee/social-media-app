import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.createUserData();
  }

  createUserData(){
    this.signupForm = this.formBuilder.group({
      name: ['',[
        Validators.required,
        Validators.maxLength(15)
      ]],
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      phone: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(8)]]
    })
  }

  signUpData(){
    if(this.signupForm.invalid){
      this.snackBar.open('all field is required || invalid your data', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      })
      return
    }
    this.authService.signupApiCall(this.signupForm.value).subscribe({
      next: (res)=>{
        alert(res)
        this.snackBar.open(`Signup successfull ${res}`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })
        this.router.navigate(['/homepage'])
      },
      error: (err)=> {
        this.snackBar.open(`Error is: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })

      }
    })
  }

  login(){
    this.router.navigate(['/login'])
  }


}
