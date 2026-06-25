import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { InvoiceForm } from './form-service/invoice-form';

@Component({
  selector: 'app-add-invoice',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormField,
    MatCardActions,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    FormRoot,
    MatError,
    MatIconButton,
  ],
  templateUrl: './add-invoice.html',
  styleUrl: './add-invoice.css',
  providers: [InvoiceForm],
})
export class AddInvoice {
  private readonly _formService = inject(InvoiceForm);

  protected readonly invoiceForm = this._formService.invoiceForm;

  protected addInvoiceItem() {
    this._formService.addInvoiceItem();
  }

  protected removeInvoiceItem(index: number) {
    this._formService.removeInvoiceItem(index);
  }

  protected fillAddress(): void {
    this._formService.fillAddress();
  }
}
