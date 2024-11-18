import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/account.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  user: User | null = null;
  cartItems = this.cartSvc.cartItems;
  private userSubscription: Subscription | null = null;
  checkoutSubmitted: boolean = false;

  checkoutForm = this.fb.nonNullable.group({
    billingInfo: this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,.-]+$')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    }),
    paymentMethod: this.fb.nonNullable.group({
      paymentMethod: ['', Validators.required],
      cardName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$')]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiration: ['', [Validators.required, Validators.pattern(/^\d{2}\/?\d{0,2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    })
  });

  constructor(private cartSvc: CartService,
              private fb: FormBuilder,
              private authSvc: AuthService,
              private router: Router) {}


  ngOnInit(){
    this.userSubscription = this.authSvc.getUser().subscribe(user =>{
      this.user = user;
    });
    this.authSvc.setPreviousUrl(this.router.url);
  }

  get firstName() { return this.checkoutForm.get('billingInfo.firstName')!; }
  get lastName() { return this.checkoutForm.get('billingInfo.lastName')!; }
  get address() { return this.checkoutForm.get('billingInfo.address')!; }
  get country() { return this.checkoutForm.get('billingInfo.country')!; }
  get state() { return this.checkoutForm.get('billingInfo.state')!; }
  get zipCode() { return this.checkoutForm.get('billingInfo.zipCode')!; }
  get paymentMethod() { return this.checkoutForm.get('paymentMethod.paymentMethod')!; }
  get cardName() { return this.checkoutForm.get('paymentMethod.cardName')!; }
  get cardNumber() { return this.checkoutForm.get('paymentMethod.cardNumber')!; }
  get expiration() { return this.checkoutForm.get('paymentMethod.expiration')!; }
  get cvv() { return this.checkoutForm.get('paymentMethod.cvv')!; }

  formatExp(event: any): void{
    let exp = event.target.value;

    if (exp.length > 2 && exp[2] !== '/') {
      exp = exp.slice(0, 2) + '/' + exp.slice(2);
    }
    event.target.value = exp;
  }

  submitCheckout(): void {
    this.checkoutSubmitted = true;
    if(!this.user && this.cartItems().length){
      this.authSvc.Show();
    }
    console.log(this.checkoutForm.get('billingInfo')?.value);
    console.log(this.checkoutForm.get('paymentMethod')?.value);
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
