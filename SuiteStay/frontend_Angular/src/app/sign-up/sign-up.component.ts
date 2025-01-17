import { Component, OnInit} from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from './password-match.directive';
import { customPassword } from './custom-password.directive';
import { AuthService } from '../services/auth.service';
import { User, userCredentials } from '../models/account.model';
import { emailValidator } from './invalidEmail.directive';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';

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
    ToastModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit{

  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  formSubmitted = false;
  errorExistingAccount: string | null = null;

  previousUrl = this.authSvc.previousUrl;
  

  signUpForm = this.fb.nonNullable.group({
    fullName:['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$')]],
    email:['', [Validators.required,]],
    password:['', Validators.required],
    Cpassword:['', Validators.required]
  }, {
    validators: [passwordMatchValidator,
                customPassword,
                emailValidator]
  })

  constructor(private fb: FormBuilder,
              private authSvc: AuthService,
              private router: Router,
              private messageSvc: MessageService) {}

             
  ngOnInit() {
    this.signUpForm.get('email')?.valueChanges.subscribe(value => {
      if (value) {
        this.authSvc.checkEmail(value).subscribe(isEmailTaken => {
          if (isEmailTaken) {
            this.signUpForm.get('email')?.setErrors({ emailTaken: true });
            this.errorExistingAccount = 'Email already exists.';
          }
        });
      }
    });

    this.authSvc.Hide();
  }


  get fullName() { return this.signUpForm.controls['fullName']; }

  get email() { return this.signUpForm.controls['email']; }

  get password() { return this.signUpForm.controls['password']; }

  get Cpassword() { return this.signUpForm.controls['Cpassword']; }

  get hasMinimumLength(): boolean{
    return this.password.value.length >= 8;
  }

  get hasUppercase(): boolean{
    return /[A-Z]/.test(this.password.value);
  }

  get hasNumeric(): boolean{
    return /\d/.test(this.password.value);
  }

  get hasSymbol(): boolean{
    return /[@$!%*#&]/.test(this.password.value);
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
  
  onSubmit() {
    this.formSubmitted = true;

    if(this.signUpForm.valid){ //checks if the form is valid
      const User: User ={ //extract data
        f_name: this.signUpForm.get('fullName')?.value.split(' ')[0]!,
        l_name: this.signUpForm.get('fullName')?.value.split(' ')[1]!,
        email: this.signUpForm.get('email')?.value!,
        password: this.signUpForm.get('password')?.value!
      }

      this.authSvc.signUp(User).pipe(
        switchMap(() => {
          const userCredentials: userCredentials = {
            email: User.email,
            password: User.password!
          };
          return this.authSvc.login(userCredentials); // Switch to the login observable
        })
      ).subscribe({
        next: () => {
          // If sign up and login are successful
          this.signUpForm.reset(); // Reset the form
          this.formSubmitted = false;
          this.messageSvc.add({
            severity: 'success',
            summary: 'Congratulations!',
            detail: 'Account ready.',
          });
          // Redirect to the previous URL
          this.router.navigate([this.authSvc.previousUrl()]);
        },
        error: () => {
          this.signUpForm.reset(); // Reset the form
          this.formSubmitted = false;
          // Handle error during sign up or login
          this.messageSvc.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong during sign up.'
          });
        }
      });
    }
  }
  
}