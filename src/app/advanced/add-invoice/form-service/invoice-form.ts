import { effect, inject, linkedSignal, Service, WritableSignal } from '@angular/core';
import { Invoice, InvoiceItem } from '../model/Invoice';
import { DataFacadeService } from '../../../@mocked-domain/data-facade-service';
import { apply, applyEach, disabled, FieldTree, form, min, required } from '@angular/forms/signals';
import { emailSchema } from '../../../utils/schemas/email.schema';
import { textSchema } from '../../../utils/schemas/text.schema';
import { invoiceItemSchema } from '../../../utils/schemas/invoice-item.schema';

@Service({ autoProvided: false })
export class InvoiceForm {
  private readonly _dataFacadeService = inject(DataFacadeService);
  private readonly _model: WritableSignal<Invoice> = linkedSignal({
    source: () => ({
      email: this._dataFacadeService.contact().email,
    }),
    computation: (source, previous) => {
      return {
        address: previous?.value?.address ?? { city: '', state: '', street: '', zip: '' },
        contact: { email: source.email },
        items: [],
        name: previous?.value?.name ?? '',
        totalAmount: 0,
      };
    },
  });
  private readonly _invoiceForm: FieldTree<Invoice> = this._prepareForm();

  public get invoiceForm() {
    return this._invoiceForm;
  }

  public constructor() {
    effect(() => {
      const items: InvoiceItem[] = this._invoiceForm.items().value();

      for (const item of items) {
        item.totalPrice = item.quantity * item.unitPrice;
      }

      const totalAmount = this._invoiceForm.items().value().reduce((acc, item) => acc + item.totalPrice, 0);

      this._model.update((value) => {
        console.log('mode update')

        return {
          ...value,
          items,
          totalAmount,
        };
      })
    });
  }

  public addInvoiceItem(): void {
    this._model.update((value) => {
      return {
        ...value,
        items: [...value.items, { description: '', quantity: 1, unitPrice: 1, totalPrice: 1 }],
      };
    });
  }

  public removeInvoiceItem(index: number): void {
    this._model.update((value) => {
      const newItems = [...value.items];
      newItems.splice(index, 1);
      return {
        ...value,
        items: newItems,
      };
    });
  }

  public fillAddress() {
    this._model.update((value) => {
      return {
        ...value,
        address: this._dataFacadeService.address(),
      };
    });
  }

  private _prepareForm(): FieldTree<Invoice> {
    return form(
      this._model,
      (schema) => {
        apply(schema.name, textSchema);
        apply(schema.address.city, textSchema);
        apply(schema.address.state, textSchema);
        apply(schema.address.street, textSchema);
        apply(schema.address.zip, textSchema);
        apply(schema.contact.email, emailSchema);
        required(schema.name, { message: 'Name is required' });
        required(schema.contact.email, { message: 'Email is required' });
        min(schema.totalAmount, 0, { message: 'Total amount must be greater than 0' });
        disabled(schema.totalAmount);
        applyEach(schema.items, invoiceItemSchema);
      },
      {
        submission: {
          action: async (field) => {
            const result = field().value();

            console.log(result);
          },
        },
      },
    );
  }
}
