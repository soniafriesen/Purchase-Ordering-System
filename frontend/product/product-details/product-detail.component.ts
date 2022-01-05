import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { ValidateDecimal } from '@app/validator/decimal.validator';
import { ValidateInt } from '@app/validator/int.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product = {
    id: '',
    vendorid: 0,
    name: '',
    costprice: 0.0,
    msrp: 0.0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0,
    qrcode:'',
    qrcodetxt:'',
    doesExist: false, 
      
  };
  @Input() vendors: Vendor[] | null = null;
  @Input() products: Product[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  productForm: FormGroup;
  id: FormControl;
  vendorid: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  qrcodetxt: FormControl;
  constructor(private builder: FormBuilder, private dialog: MatDialog) {
    this.id = new FormControl(
      '',
      Validators.compose([
        this.uniqueCodeValidator.bind(this),
        Validators.required,
      ])
    );
    this.vendorid = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateDecimal])
    );
    this.msrp = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateDecimal])
    );
    this.rop = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInt])
    );
    this.eoq = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInt])
    );
    this.qoh = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInt])
    );
    this.qoo = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInt])
    );
    this.qrcodetxt = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.productForm = this.builder.group({
      id: this.id,
      vendorid: this.vendorid,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      qrcodetxt: this.qrcodetxt,
    });
  } // constructor
  ngOnInit(): void {
    // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      id: this.selectedProduct.id,
      vendorid: this.selectedProduct.vendorid,
      name: this.selectedProduct.name,
      costprice: this.selectedProduct.costprice,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo,
      qrcodetxt: this.selectedProduct.qrcodetxt,
    });
  } // ngOnInit
  updateSelectedProduct(): void {
    this.selectedProduct.id = this.productForm.value.id;
    this.selectedProduct.vendorid = this.productForm.value.vendorid;
    this.selectedProduct.name = this.productForm.value.name;
    this.selectedProduct.msrp = this.productForm.value.msrp;
    this.selectedProduct.costprice = this.productForm.value.costprice;
    this.selectedProduct.rop = this.productForm.value.rop;
    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.qoo = this.productForm.value.qoo;
    this.selectedProduct.qrcodetxt = this.productForm.value.qrcodetxt;
    this.saved.emit(this.selectedProduct);
  } // updateSelectedProduct

  openDeleteModal(selectedProduct: Product): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete Product ${this.selectedProduct.id}`,
      entityname: 'product',
    };
    dialogConfig.panelClass = 'custommodal';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleted.emit(this.selectedProduct);
      }
    });
  } // openDeleteModal

  uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {
    /**
     * uniqueCodeValidator - needed access to products property so not
     * with the rest of the validators
     */
    if (this.products !== null) {
      if (
        this.products.find(
          (p) => p.id === control.value && !this.selectedProduct.id
        )
      ) {
        return { idExists: true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } // uniqueCodeValidator
} // ProductDetailComponent
