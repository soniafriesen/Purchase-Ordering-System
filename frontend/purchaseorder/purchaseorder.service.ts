import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constrants';
import { Purchaseorder } from './purchaseorder';
import { GenericHttpService } from '../generic-http.service';
@Injectable({
  providedIn: 'root',
})
export class PurchaseorderService extends GenericHttpService<Purchaseorder> {
  constructor(public http: HttpClient) {
    super(http, `${BASEURL}api/pos`);
  }
}
