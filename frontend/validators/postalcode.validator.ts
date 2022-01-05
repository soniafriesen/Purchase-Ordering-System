import { AbstractControl } from '@angular/forms';
export function ValidatePostalCode(control: AbstractControl) {
  const CODE_REGEXP = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i;
  return !CODE_REGEXP.test(control.value) ? { invalidPostalCode: true } : null;
} // ValidatePostalcode
