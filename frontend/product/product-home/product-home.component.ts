import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { Observable, of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: 'product-home.component.html',
})
export class ProductHomeComponent implements OnInit {
  vendors$?: Observable<Vendor[]>;
  products: Product[];
  products$?: Observable<Product[]>;
  selectedProduct: Product;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  size: number = 0;
  displayedColumns: string[] = ['id', 'name', 'vendorid'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private vendorService: VendorService,
    private productService: ProductService
  ) {
    this.hideEditForm = true;
    this.products = [];
    this.selectedProduct = {
      id: '',
      vendorid: 0,
      name: '',
      costprice: 0.0,
      msrp: 0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
      doesExist: false,
   
    };
    this.msg = '';
    this.todo = '';
    this.url = '';
    this.dataSource = new MatTableDataSource(new Array<Product>());
    this.sort = null;
  } // constructor
  ngOnInit(): void {
    this.msg = 'loading vendors from server...';
    this.msg = `Vendor's loaded`;
    this.vendors$ = this.vendorService.getAll().pipe(
      share(),
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.msg = `Product's loaded`;
    this.products$ = this.productService.getAll().pipe(
      share(),
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.refreshDS();
  }
  select(product: Product): void {
    this.todo = 'update';
    product.doesExist = true;
    this.selectedProduct = product;
    this.msg = `Product ${this.selectedProduct.id} selected`;
    this.hideEditForm = !this.hideEditForm;
    
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string): void {
    if (msg) {
      this.msg = 'Operation cancelled';
    }
    this.hideEditForm = !this.hideEditForm;
    this.refreshDS();
  } // cancel
  /**
   * update - send changed update to service update local array
   */
  update(product: Product): void {
    this.msg = 'Updating...';
    this.productService.update(product).subscribe(
      (payload) => {
        if (payload.id !== '') {
          this.msg = `Product ${product.id} updated!`;
        } else {
          this.msg = 'Product not updated! - server error';
        }
        this.refreshDS();
      },
      (err) => {
        this.msg = `Error - product not updated - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // update
  /**
   * save - determine whether we're doing an add or an update
   */
  save(product: Product): void {
    product.doesExist ? this.update(product) : this.add(product);
  } // save
  /**
   * add - send product to service, receive newid back
   */
  add(product: Product): void {
    this.msg = 'Adding...';
    this.productService.add(product).subscribe(
      (payload) => {
        if (payload.id !== '') {
          this.msg = `Product ${payload.id} added!`;
        } else {
          this.msg = 'Product not added! - server error';
        }
        this.refreshDS();
      },
      (err) => {
        this.msg = `Error - product not added - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // add
  /**
   * newProduct - create new product instance
   */
  newProduct(): void {
    this.selectedProduct = {
      id: '',
      vendorid: 0,
      name: '',
      costprice: 0,
      msrp: 0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
      doesExist: false,
     
    };
    this.msg = 'New product';
    this.hideEditForm = !this.hideEditForm;
  } // newProduct
  /**
   * delete - send product id to service for deletion
   */
  delete(product: Product): void {
    this.msg = 'Deleting...';
    this.productService.deleteString(product.id).subscribe(
      (payload) => {
        if (payload != null) {
          // server returns # rows deleted
          this.msg = `Product ${product.id} deleted!`;
        } else {
          this.msg = 'Product not deleted!';
        }
        this.refreshDS();
      },
      (err) => {
        this.msg = `Error - product not deleted - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // delete
  /**
   * refresh - update data table with any changes,
   * and reset sort directive
   */
  refreshDS(): void {
    this.products$?.subscribe((products) => {
      this.size = products.length;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
      if (this.paginator !== undefined) {
        this.dataSource.paginator = this.paginator;
      }
    });
  } // refresh
} // ProductHomeComponent
