const title = { minLength: 3, maxLength: 500 };

export default {
  title: (value: string) => (value.length >= title.minLength
    ? null : `Must be at least ${title.minLength} characters`)
  || (value.length <= title.maxLength
    ? null : `Must be at most ${title.maxLength} characters`),
  contentCharacterLimit: 5000,
};
