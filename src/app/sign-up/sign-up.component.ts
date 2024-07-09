import { Component, OnInit } from '@angular/core';
import { ROUTER_TOKENS } from '../app.routes';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    InputMaskModule,
    PasswordModule,
    ReactiveFormsModule,
    CommonModule,
    TagModule,
    DividerModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  readonly ROUTER_TOKENS = ROUTER_TOKENS;

  signUpForm = this.fb.group({
    fName:['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    lName:['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#&])[A-Za-z\\d@$!%*#&]{8,}$')]],
    Cpassword:['', Validators.required]
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  get fName(){
    return this.signUpForm.controls['fName'];
  }

  get lName(){
    return this.signUpForm.controls['lName'];
  }

  get email(){
    return this.signUpForm.controls['email'];
  }

  get password(){
    return this.signUpForm.controls['password'];
  }

  get Cpassword(){
    return this.signUpForm.controls['Cpassword'];
  }

  format_error(): string{
    return "Invalid format. Letters only.";
  }

  required_error(): string{
    return "Field is required.";
  }

  email_error(): string{
    return "Email should be valid."
  }

  password_requirement_error(): string{
    return "Password should meet all requirements."
  }

}