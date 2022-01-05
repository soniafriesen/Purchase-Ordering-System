import { AbstractControl } from '@angular/forms';
export function ValidateEmail(control: AbstractControl) {
  const EMAIL_REGEXP =
    /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return !EMAIL_REGEXP.test(control.value) ? { invalidEmail: true } : null;
} // ValidateEmail
