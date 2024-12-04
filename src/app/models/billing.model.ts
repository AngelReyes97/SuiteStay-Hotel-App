import { User } from "./account.model";

export interface BillingInfo {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    zipCode: string;
  }
  
  export interface PaymentMethod {
    paymentMethod: string;
    cardName: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
  }
  
  export interface CheckoutFormData {
    billingInfo: BillingInfo;
    paymentMethod: PaymentMethod;
    user: User;
  }