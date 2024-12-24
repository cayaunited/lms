const stringList = (maxArrayLength: number, maxStringLength: number) => (valuesString: string) => {
  const values = valuesString.trim().split('\n');
  
  for (let s = 0; s < values.length; s++) {
    const string = values[s];
    if (string.length > maxStringLength) return `No more than ${maxStringLength} characters per line`;
  }
  
  return values.length <= maxArrayLength ? null : `No more than ${maxArrayLength}`;
};

export default {
  biography: (value: string) => (value.length <= 500 ? null : 'Must be at most 500 characters'),
  majors: stringList(3, 50),
  minors: stringList(3, 50),
  semesters: (value: number | string) => ((!value || typeof(value) === 'number' && value >= 0) ? null : 'Must be 0 semesters at minimum'),
  organizations: stringList(10, 50),
  hobbies: stringList(10, 100),
};
