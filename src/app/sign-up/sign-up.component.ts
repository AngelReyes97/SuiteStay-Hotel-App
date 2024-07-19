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
import { passwordMatchValidator } from './password-match.directive';
import { customPassword } from './custom-password.directive';

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
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  formSubmitted = false;

  signUpForm = this.fb.group({
    fName:['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    lName:['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
    Cpassword:['', Validators.required]
  }, {
    validators: [passwordMatchValidator, customPassword]
  })

  constructor(private fb: FormBuilder) {}

  get fName() { return this.signUpForm.controls['fName']; }

  get lName() { return this.signUpForm.controls['lName']; }

  get email() { return this.signUpForm.controls['email']; }

  get password() { return this.signUpForm.controls['password']; }

  get Cpassword() { return this.signUpForm.controls['Cpassword']; }

  get hasMinimumLength(): boolean{
    const passwordValue= this.password?.value;
    if(passwordValue){
      return this.password?.value?.length >= 8;
    }
    return false;
  }

  get hasUppercase(): boolean{
    const passwordValue= this.password?.value;
    if (passwordValue){
      return /[A-Z]/.test(this.password?.value);
    }
    return false;
  }

  get hasNumeric(): boolean{
    const passwordValue= this.password?.value;
    if(passwordValue){
      return /\d/.test(this.password?.value);
    }
    return false;
  }

  get hasSymbol(): boolean{
    const passwordValue= this.password?.value;
    if(passwordValue){
      return /[@$!%*#&]/.test(this.password?.value);
    }
    return false;
  }

  onSubmit() {
    this.formSubmitted = true;
    if(this.signUpForm.valid){
      console.log('form submitted!', this.signUpForm.value);
      this.signUpForm.reset(); // Reset the form after successful submission
      this.formSubmitted = false; // Optionally reset formSubmitted to false
    }
  }

  getInputStyle(controlName: string): { [key: string]: string } {
    const pswrd = this.signUpForm.get(controlName);
    if(controlName == 'Cpassword'){
      if(pswrd?.valid && pswrd?.touched && !this.signUpForm.errors?.['passwordMismatch']){
        return { 'border': '1px solid teal',
          'border-radius': '10px',
          'box-shadow': 'none'
        };
      }else if(this.formSubmitted || (pswrd?.touched && this.signUpForm.errors?.['passwordMismatch'])){
        return { 'border': '1px solid red',
          'border-radius': '10px',
          'box-shadow': 'none'
          };
      }
    }
    if(controlName == 'password')
    {
      if (pswrd?.valid && pswrd?.touched && !this.signUpForm.errors?.['pattern']) {
        return { 'border': '1px solid teal',
                  'border-radius': '10px',
                  'box-shadow': 'none'
              };
      } else if (this.formSubmitted || (pswrd?.touched && this.signUpForm.errors?.['pattern'])) {
        return { 'border': '1px solid red',
                'border-radius': '10px',
                'box-shadow': 'none'
                };
      }
    }
    return {};
  }
  
}