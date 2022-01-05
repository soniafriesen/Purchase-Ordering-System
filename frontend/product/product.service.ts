import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '@app/constrants';
import { Product } from './product';
import { GenericHttpService } from '../generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends GenericHttpService<Product> {
  constructor(public http: HttpClient) {
    super(http, `${BASEURL}api/products`);
  } // constructor
} // ProductService
