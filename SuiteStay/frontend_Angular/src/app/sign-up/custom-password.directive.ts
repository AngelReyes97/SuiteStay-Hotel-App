import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const customPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#&])[A-Za-z\d@$!%*#&]{8,}$/;
    const isValid = pattern.test(password);

    if(!password){
        return null;
    }

    return isValid ? null : {'pattern': true};
}