import { PurchaseorderItem } from './purchaseorder-item';
/*
    Purcahse Order - interface for product report 
*/
export interface Purchaseorder {
  id: number;
  vendorid: number;
  amount: number;
  items: PurchaseorderItem[];
  datecreated: string;
}
