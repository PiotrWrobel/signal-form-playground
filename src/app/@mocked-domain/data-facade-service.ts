import { Service, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Service()
export class DataFacadeService {
  private readonly _user = signal({username: 'John Doe'});
  private readonly _address = signal({street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345'});
  private readonly _contact = signal({email: 'test@test.com'});

  public get user() {
    return this._user.asReadonly();
  }

  public get address() {
    return this._address.asReadonly();
  }

  public get contact() {
    return this._contact.asReadonly();
  }

  public isEmailTaken(email: string): Observable<boolean> {
    const normalizedEmail = email.trim().toLowerCase();
    const responseDelayMs = 1000 + Math.floor(Math.random() * 2001);

    return of(normalizedEmail.endsWith('.pl')).pipe(delay(responseDelayMs));
  }


}
