import { apply, debounce, max, min, required, Schema, schema } from '@angular/forms/signals';
import { textSchema } from './text.schema';
import { InvoiceItem } from '../../advanced/add-invoice/model/Invoice';

export const invoiceItemSchema: Schema<InvoiceItem> = schema((item) => {
  apply(item.description, textSchema);
  required(item.description, { message: 'Description is required' });
  debounce(item.description, 300);
  required(item.quantity, { message: 'Quantity is required' });
  min(item.quantity, 1, { message: 'Quantity must be greater than 0' });
  max(item.unitPrice, 10000, { message: 'Unit price must be less than 10000' });
  required(item.unitPrice, { message: 'Unit price is required' });
  min(item.unitPrice, 0.01, { message: 'Unit price must be greater than 0' });
  max(item.unitPrice, 99999, { message: 'Unit price must be less than 99999' });
  required(item.totalPrice, { message: 'Total price is required' });
});
