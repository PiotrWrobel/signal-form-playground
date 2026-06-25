import { Component, computed, inject, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAccount } from './service/create-account';
import { FormField, FormRoot } from '@angular/forms/signals';
import { PASSWORD_HINT } from '../../../utils/schemas/password.schema';
import { CustomInput } from '../../../utils/components/custom-input/custom-input';

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
    CustomInput,
  ],
  providers: [CreateAccount],
  templateUrl: './create-account-signal.component.html',
  styleUrl: './create-account-signal.component.css',
})
export class CreateAccountSignalComponent {
  private readonly _createAccount = inject(CreateAccount);

  public readonly form = this._createAccount.form;

  protected async modifyUsername() {
    this.form.username().value.set('test');
    this.form.username().markAsTouched();
  }

  protected passwordHint: Signal<string> = computed(() => {
    if (this.form.password().touched()) {
      return this.form.password().metadata(PASSWORD_HINT)?.() ?? '';
    }

    return '';
  });
}
