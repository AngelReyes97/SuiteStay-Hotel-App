import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/account.model';
import { catchError, concatMap, EMPTY, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { CheckoutFormData } from '../models/billing.model';
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AccordionModule,
    DividerModule,
    ToastModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  user: User | null = null;
  cartItems = this.cartSvc.cartItems;
  private userSubscription: Subscription | null = null;
  checkoutSubmitted: boolean = false;
  dates: Date[] = [];
  today = new Date();
  grandTotal = this.cartSvc.grandTotal;

  checkoutForm = this.fb.nonNullable.group({
    billingInfo: this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,.#-]+$')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    }),
    paymentMethod: this.fb.nonNullable.group({
      paymentMethod: ['', Validators.required],
      cardName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$')]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiration: ['', [Validators.required, Validators.pattern(/^\d{2}\/?\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    })
  });

  constructor(private cartSvc: CartService,
              private fb: FormBuilder,
              private authSvc: AuthService,
              private router: Router,
              private msgSvc: MessageService) {}


  ngOnInit(){
    this.userSubscription = this.authSvc.getUser().subscribe(user =>{
      this.user = user;
    });
    this.authSvc.setPreviousUrl(this.router.url);

    const paymentInfo = this.cartSvc.getBillingInfo();
    if(paymentInfo){
      this.checkoutForm.patchValue(paymentInfo);
    }

    this.checkoutForm.valueChanges.subscribe(data =>{
      this.cartSvc.saveBillingInfo(data as CheckoutFormData);
    })
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  dateRange(checkIn: Date, checkOut: Date){
    this.dates = [];
    const check_in = new Date(checkIn);
    let currentDate = check_in;
    
    while(currentDate < checkOut){
      this.dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  getCancellationDate(checkInDate: Date): Date {
    const cancellationDate = new Date(checkInDate);
    cancellationDate.setDate(cancellationDate.getDate() - 3);
    return cancellationDate;
  }

  removeItem(resId: number){
    this.cartSvc.removeReservation(resId);
  }

  submitCheckout(): void {
    this.checkoutSubmitted = true;

    if(this.checkoutForm.valid){
      if(!this.user && this.cartItems().length){
        this.authSvc.Show();
      } 
      else if(this.user && this.cartItems().length){
        const user = this.user;
        this.checkoutSubmitted = false;

        const reservation = this.cartItems().map(reservation => ({
          city: reservation.city,
          state: reservation.state,
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          numberOfGuest: reservation.numberOfGuest,
          totalNights: reservation.totalNights,
          price: reservation.price,
          user: {
            account_id: user.account_id,  // Send just the necessary fields
            f_name: user.f_name,
            l_name: user.l_name,
            email: user.email,
          },
          room: reservation.room
        }));

        const checkOutForm = this.checkoutForm.getRawValue();
        const billingInfo: CheckoutFormData = { ...checkOutForm, user: user}

        this.cartSvc.finalizeBooking(reservation).pipe(
          concatMap(() => {
            return this.cartSvc.finalizeBilling(billingInfo).pipe(
              catchError(() => {
                this.checkoutForm.reset();
                this.msgSvc.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Billing process failed.'
                });
                return EMPTY;
              })
            )
          })
        ).subscribe({
          next: ()=>{
            this.checkoutForm.reset();
            this.cartSvc.clearAllItems();
            this.msgSvc.add({
              severity: 'success',
              summary: 'Booking Confirmed!',
              detail: 'We’ll see you soon!'
            });

          },
          error: ()=>{
            this.checkoutForm.reset();
            this.msgSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Booking process failed.'
            });
          }
        });
      }
    }
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
