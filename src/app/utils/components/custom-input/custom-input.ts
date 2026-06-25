import { Component, input, model, ModelSignal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput implements FormValueControl<string> {
  public readonly placeholder = input('');
  public value: ModelSignal<string> = model('');


  protected updateValue(value: string) {
    this.value.set(value);
  }
}
