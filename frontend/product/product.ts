/**
 * expense - interface for Product
 */
export interface Product {
  id: string;
  vendorid: number;
  name: string;
  costprice: number;
  msrp: number;
  rop: number;
  eoq: number;
  qoh: number;
  qoo: number;
  qrcode: string; //case 2
  qrcodetxt: string; //case 2
  doesExist: Boolean; 
}
