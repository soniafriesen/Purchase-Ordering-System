import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constrants';
import { Vendor } from './vendor';
import { GenericHttpService } from '@app/generic-http.service';
// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class VendorService extends GenericHttpService<Vendor> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `${BASEURL}api/vendors`);
  } // constructor
} //VendorService
