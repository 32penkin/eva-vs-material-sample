const PATTERN_EMAIL: RegExp = /\S+@\S+\.\S+/;
const PATTERN_PASSWORD: RegExp = /[a-z0-9]{8,}/;

export const EmailValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_EMAIL, value);
};

export const PasswordValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_PASSWORD, value);
};

const RegExpValidator = (regexp: RegExp, value: string): boolean => {
  return regexp.test(value);
};
