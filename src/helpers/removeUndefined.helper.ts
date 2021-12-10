const removeUndefined = (obj: any): any => {
    if (obj === undefined) return null;
    if (typeof obj === 'object') {
      for (const key in obj) {
        obj[key] = removeUndefined(obj[key]);
      }
    }
    return obj;
  };
  export default removeUndefined;
  