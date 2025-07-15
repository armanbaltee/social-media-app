import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.createLoginData()
  }

  createLoginData(){
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }
  loginUser(){
    if(!this.loginForm.valid){
       this.snackBar.open('All field is required.', 'Close', {
  duration: 3000,
  panelClass: ['error-snackbar']
});

    }
    this.authService.loginApiCall(this.loginForm.value).subscribe({
      next: (res:any)=>{
        const token = res.token
        if(!token){
          alert("Token not received from server");
          return
        }
        localStorage.setItem('token', token)
        this.snackBar.open('Login Successfull!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/homepage'])
      },
      error: (err)=>{
        this.snackBar.open(`invalid email or password`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });

      }
    })
  }
  signupUser(){
    this.router.navigate(['/signup'])
  }
}
