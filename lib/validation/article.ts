const name = { minLength: 3, maxLength: 100 };

export default {
  name: (value: string) => (value.length >= name.minLength
    ? null : `Must be at least ${name.minLength} characters`)
  || (value.length <= name.maxLength
    ? null : `Must be at most ${name.maxLength} characters`),
  contentCharacterLimit: 20000,
};
