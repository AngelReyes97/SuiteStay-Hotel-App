import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const dates: Date[] | null = control.get('rangeDates')?.value;
    if (!dates){
        return {dateRangeInvalid: true};
    }
    return null;
}