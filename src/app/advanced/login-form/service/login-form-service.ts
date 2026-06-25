import { Service, signal, WritableSignal } from '@angular/core';
import { debounce, FieldTree, form, hidden, required } from '@angular/forms/signals';

interface LoginForm {
  username: string;
  password: string;
}

@Service({ autoProvided: false })
export class LoginFormService {
  private readonly _model: WritableSignal<LoginForm> = signal({
    username: '',
    password: '',
  });

  private _createAccountForm!: FieldTree<LoginForm>;

  constructor() {
    this._initForm();
  }

  public get form() {
    return this._createAccountForm;
  }

  private _initForm() {
    this._createAccountForm = form<LoginForm>(
      this._model,
      (schema) => {
        required(schema.username, { message: 'Invalid username' });
        debounce(schema.username, 500);
        hidden(schema.password, {
          when: ({ valueOf }) => valueOf(schema.username).endsWith('@company.com'),
        });
        required(schema.password, { message: 'Invalid username' });
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
