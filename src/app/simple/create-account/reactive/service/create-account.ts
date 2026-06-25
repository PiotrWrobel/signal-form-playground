import { inject, Service } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';

interface CreateAccountForm {
  username: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  return password === repeatPassword ? null : { passwordMismatch: true };
}

@Service({autoProvided: false})
export class CreateAccount {
  private readonly _fb = inject(NonNullableFormBuilder);

  private _form!: FormGroup<CreateAccountForm>;

  constructor() {
    this._initForm();
  }

  public get form() {
    return this._form;
  }

  private _initForm() {
    this._form = this._fb.group(
      {
        username: this._fb.control('', [Validators.required, Validators.maxLength(20)]),
        password: this._fb.control('', [Validators.required]),
        repeatPassword: this._fb.control('', [Validators.required]),
      },
      { validators: passwordsMatchValidator },
    );
  }
}
