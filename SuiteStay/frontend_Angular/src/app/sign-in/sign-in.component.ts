import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {ReactiveFormsModule, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    NgbDropdownModule,
    ButtonModule,
    RouterLink,
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [NgbDropdownConfig]
})
export class SignInComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  visible = this.authSvc.showSignIn;
  formSubmitted: boolean = false;
  errorMsg: string | null = null;

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })


	constructor(private fb: FormBuilder,
              private authSvc: AuthService,
              private msgSvc: MessageService) {}

  get email(){
    return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
  }

  restInput(){
    this.loginForm.reset();
    this.authSvc.Hide();
    this.formSubmitted = false;
    this.errorMsg = null;
  }

  submitLogin(){
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.authSvc.login(this.loginForm.getRawValue()).subscribe({
        next: () =>{
          this.loginForm.reset();
          this.formSubmitted = false;
          this.errorMsg = null;
          this.authSvc.Hide();
          this.msgSvc.add({
            severity: 'success',
            summary: 'Sign-In Successful',
            detail: 'Welcome back!'
          })
        },
        error: (err) =>{
          if(err.status === 401) {
            this.errorMsg = "The email or password you entered is incorrect.";
          }
          this.loginForm.reset();
          this.formSubmitted = false;
        }
      });
    }
  }

  showSignIn(){
    this.authSvc.Show();
  }
}