import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/account.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  user: User | null = null;
  cartItems = this.cartSvc.cartItems();
  private userSubscription: Subscription | null = null;

  checkoutForm = this.fb.nonNullable.group({
    billingInfo: this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    }),
    paymentMethod: this.fb.nonNullable.group({
      paymentMethod: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required]
    })
  })

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

  submitCheckout(): void {
    if(!this.user && this.cartItems){
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
