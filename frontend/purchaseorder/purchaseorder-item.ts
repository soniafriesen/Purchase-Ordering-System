/**
 * PurchaseorderItem - class for product report item
 */

export interface PurchaseorderItem {
  id: number;
  price: number;
  productid: string;
  po: number;
  qty: number;
  name: string;
}
