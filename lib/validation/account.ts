const name = { minLength: 3, maxLength: 50 };
const email = { maxLength: 100 };
const password = { minLength: 8, maxLength: 30 };

export default {
  name: (value: string) => (value.length >= name.minLength
      ? null : `Must be at least ${name.minLength} characters`)
    || (value.length <= name.maxLength
      ? null : `Must be at most ${name.maxLength} characters`),
  email: (value: string) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Must be in email format')
    || (value.length <= email.maxLength
      ? null : `Must be at most ${email.maxLength} characters`),
  password: (value: string, values: any) => (value.length >= password.minLength
      ? null : `Must be at least ${password.minLength} characters`)
    || (value.length <= password.maxLength
      ? null : `Must be at most ${password.maxLength} characters`)
    || (/\d{1,}/.test(value) ? null : 'Needs at least one number')
    || (/[a-z]{1,}/.test(value) ? null : 'Needs at least lowercase letter')
    || (/[A-Z]{1,}/.test(value) ? null : 'Needs at least uppercase letter')
    || (values.currentPassword && value == values.currentPassword ? 'Must be a new password' : null),
  confirmPassword: (value: string, values: any) => value == values.password
    ? null : 'Must match password',
  currentPassword: (value: string, values: any) => (value || !values.password) ? null : 'Required',
};
