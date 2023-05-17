import {FormControl} from "@angular/forms";

export class EmailValidator {
  static isValid(control: FormControl): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(control.value);
    return isValid ? null : { 'invalidEmail': true };
  }
}
