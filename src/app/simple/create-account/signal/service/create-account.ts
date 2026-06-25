import { inject, Service, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { email, FieldTree, form, required, validate } from '@angular/forms/signals';

interface CreateAccountForm {
  username: string;
  password: string;
  repeatPassword: string;
}

@Service({ autoProvided: false })
export class CreateAccount {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _model: WritableSignal<CreateAccountForm> = signal({
    username: '',
    password: '',
    repeatPassword: '',
  });

  private _createAccountForm!: FieldTree<CreateAccountForm>;

  constructor() {
    this._initForm();
  }

  public get form() {
    return this._createAccountForm;
  }

  private _initForm() {
    this._createAccountForm = form<CreateAccountForm>(
      this._model,
      (schema) => {
        email(schema.username, { message: 'Invalid email' });
        required(schema.username, { message: 'Username is required' });
        required(schema.password, { message: 'Password is required' });
        required(schema.repeatPassword, { message: 'Repeat your password' });
        validate(schema, ({ value }) => {
          return value().password === value().repeatPassword
            ? null
            : { message: 'Hasła nie są identyczne', kind: 'passwordMismatch' };
        });
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
