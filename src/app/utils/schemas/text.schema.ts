import { maxLength, pattern, Schema, schema } from '@angular/forms/signals';

export const textSchema: Schema<string> = schema(value => {
  maxLength(value, 100, { message: 'Text must be at most 100 characters long' });
  pattern(value, new RegExp('^[a-zA-Z0-9 ]*$'), { message: 'Text must only contain alphanumeric characters and spaces' });
})
