import { inject, Service, Signal, signal, WritableSignal } from '@angular/core';
import { apply, disabled, FieldTree, form, metadata, required, validate, validateAsync } from '@angular/forms/signals';
import { emailSchema } from '../../../../utils/schemas/email.schema';
import { PASSWORD_HINT, passwordSchema } from '../../../../utils/schemas/password.schema';
import { DataFacadeService } from '../../../../@mocked-domain/data-facade-service';
import { rxResource } from '@angular/core/rxjs-interop';

interface CreateAccountForm {
  username: string;
  password: string;
  repeatPassword: string;
}

@Service({ autoProvided: false })
export class CreateAccount {
  private readonly _dataFacadeService = inject(DataFacadeService);
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
        apply(schema.username, emailSchema);
        apply(schema.password, passwordSchema);
        required(schema.repeatPassword, { message: 'Repeat your password' });
        required(schema.username, { message: 'Username is required' });
        validate(schema, ({ value }) => {
          return value().password === value().repeatPassword
            ? null
            : { message: 'Hasła nie są identyczne', kind: 'passwordMismatch' };
        });
        metadata(schema.password, PASSWORD_HINT, (passwordField) => {
          const password: string = passwordField.value();
          const onlySimpleChars = new RegExp(/^[A-Za-z0-9]*$/);
          if(onlySimpleChars.test(password)) {
            return 'Hasło zbyt proste'
          }

          return ''
        })
        validateAsync(schema.username, {
          params: ({value}) => value(),
          factory: this.createUsernameResource,
          onSuccess: (isTaken) =>
            isTaken ? {message: 'Username is already taken', kind: 'usernameTaken'} : null,
          onError: () => ({
            kind: 'serverError',
            message: 'Could not verify username',
          }),
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

  private createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return rxResource({
      params: () => usernameSignal(),
      stream: ({ params: username }) => this._dataFacadeService.isEmailTaken(username)
    });
  };
}
