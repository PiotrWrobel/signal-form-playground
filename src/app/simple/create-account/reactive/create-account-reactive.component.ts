import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAccount } from './service/create-account';

@Component({
  selector: 'app-create-account-component',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [CreateAccount],
  templateUrl: './create-account-reactive.component.html',
  styleUrl: './create-account-reactive.component.css',
})
export class CreateAccountReactiveComponent {
  private readonly _createAccount = inject(CreateAccount);

  public readonly form = this._createAccount.form;

  public submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Create account payload:', this.form.getRawValue());
  }
}
