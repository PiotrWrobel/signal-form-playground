export interface Invoice {
  name: string;
  address: InvoiceAddress;
  contact: InvoiceContact;
  totalAmount: number;
  items: InvoiceItem[];
}

export interface InvoiceAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface InvoiceContact {
  email: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
