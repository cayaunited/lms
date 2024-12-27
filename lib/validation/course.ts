import icons from '../icons';
import colors from '../colors';

const number = { minLength: 3, maxLength: 10 };
const name = { minLength: 3, maxLength: 50 };

export default {
  number: (value: string) => (value.length >= number.minLength
    ? null : `Must be at least ${number.minLength} characters`)
  || (value.length <= number.maxLength
    ? null : `Must be at most ${number.maxLength} characters`),
  name: (value: string) => (value.length >= name.minLength
    ? null : `Must be at least ${name.minLength} characters`)
  || (value.length <= name.maxLength
    ? null : `Must be at most ${name.maxLength} characters`),
  icon: (value: string) => (Number(value) >= 0 && Number(value) <= icons.length - 1 ? null : 'Must be a valid icon'),
  color: (value: string) => (Number(value) >= 0 && Number(value) <= colors.length - 1 ? null : 'Must be a valid color'),
};
