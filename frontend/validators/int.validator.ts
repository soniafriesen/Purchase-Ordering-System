import { AbstractControl } from '@angular/forms';
export function ValidateInt(control: AbstractControl) {
  const INT_REGEXP = /^\d+$/i;
  return !INT_REGEXP.test(control.value) ? { invalidInt: true } : null;
} // ValidateInt
