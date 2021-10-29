const validateSSN = (value: string) : boolean => (/\d{9}/).test(value.toLowerCase());

const validateCN = (value: string) : boolean => (/[a-z]\d{6}/).test(value.toLowerCase());

const validateCID = (value: string) : boolean => (/\d{9}/).test(value.toLowerCase());

export const validate = (formEntry: [string, string]) : boolean => {
  const [type, value] = formEntry;
  switch(type) {
    case 'ssn':
      return validateSSN(value);
    case 'cn':
      return validateCN(value);
    case 'cid':
      return validateCID(value);
    default:
      console.error(`[Validate] validate - Parameter type:string invalid (type=${type})`);
      return false;
  }
}