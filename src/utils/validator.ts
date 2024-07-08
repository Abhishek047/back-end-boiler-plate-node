import { ValidationResult, ValidatorObject } from '../types/validator-types';

export function validate<RequestBody extends object>(validatorObject: ValidatorObject<RequestBody>, body: any): ValidationResult<RequestBody> {
  let isValid = true;
  let reason = 'success';
  const keys = Object.keys(validatorObject) as (keyof RequestBody)[];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!validatorObject[key](body[key] || undefined)) {
      isValid = false;
      reason = `Validation failed for ${String(key)}`;
      break;
    }
  }
  return {
    data: body as RequestBody,
    success: isValid,
    reason,
  };
}
