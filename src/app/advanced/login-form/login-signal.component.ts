import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginFormService } from './service/login-form-service';
import { FormField, FormRoot, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-login-account-component',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormField,
    FormRoot,
  ],
  providers: [LoginFormService],
  templateUrl: './login-signal.component.html',
  styleUrl: './login-signal.component.css',
})
export class LoginSignalComponent {
  private readonly _createAccount = inject(LoginFormService);

  public readonly form = this._createAccount.form;

  protected async modifyUsername() {
    this.form.username().value.set('test');
    this.form.username().markAsTouched();
  }
}
