export type ValidatorObject<ObjectType extends object> = {
  [key in keyof ObjectType]: (value: any) => boolean;
};
export type ValidationResult<T> = {
  data: T;
  success: boolean;
  reason: string;
};
