import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateAccountSignalComponent } from './advanced/create-account/signal/create-account-signal.component';
import { LoginSignalComponent } from './advanced/login-form/login-signal.component';
import { AddInvoice } from './advanced/add-invoice/add-invoice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateAccountSignalComponent, LoginSignalComponent, AddInvoice],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('signal-forms');
}
