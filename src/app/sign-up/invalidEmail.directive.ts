import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('email')?.value;

    if(!email){
        return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com)$/;
    const isValid = emailPattern.test(email);
    return isValid ? null : {invalidEmail: true};
}