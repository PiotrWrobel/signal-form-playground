import { maxLength, pattern, schema, Schema } from '@angular/forms/signals';

export const emailSchema: Schema<string> = schema((value) => {
  pattern(value, new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), {
    message: 'Invalid email',
  });
  maxLength(value, 50, { message: 'Email must be at most 50 characters long' });
});
