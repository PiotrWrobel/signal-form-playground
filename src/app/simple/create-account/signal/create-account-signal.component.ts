import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAccount } from './service/create-account';
import { FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-create-account-component',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormField,
    FormRoot,
  ],
  providers: [CreateAccount],
  templateUrl: './create-account-signal.component.html',
  styleUrl: './create-account-signal.component.css',
})
export class CreateAccountSignalComponent {
  private readonly _createAccount = inject(CreateAccount);

  public readonly form = this._createAccount.form;
}
