import {
  createMetadataKey,
  maxLength,
  minLength,
  required,
  Schema,
  schema,
} from '@angular/forms/signals';

export const PASSWORD_HINT = createMetadataKey<string>();

export const passwordSchema: Schema<string> = schema((value) => {
  required(value, { message: 'Password is required' });
  minLength(value, 8, { message: 'Password must be at least 8 characters long' });
  maxLength(value, 16, { message: 'Password must be at most 16 characters long' });
});
