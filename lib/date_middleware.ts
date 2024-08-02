export const convertUTCDateToJST = (date: Date) => {
  const utcDate = new Date(date);
  // Add 9 hours to the UTC date to convert it to JST
  utcDate.setHours(utcDate.getHours() + 9);
  return utcDate;
};

export const convertDateToUTC = (date: Date) => {
  const localDate = new Date(date);
  // Subtract 9 hours from the local date to convert it to UTC
  localDate.setHours(localDate.getHours() - 9);
  return localDate;
};

export const dbNow = () => {
  return convertUTCDateToJST(new Date());
};

export const adjustDates = (
  obj: { [x: string]: any },
  dateConversionFunction: { (date: Date): Date; (arg0: any): any }
) => {
  if (!obj || typeof obj !== "object") {
    return;
  }

  if (obj["isUTC"]) {
    return;
  }

  for (const key of Object.keys(obj)) {
    // If the property is a Date object, apply the provided date conversion function
    if (obj[key] instanceof Date) {
      obj[key] = dateConversionFunction(obj[key]);

      // Since it is executed several times, probably due to caching,
      // setting a flag that it has been converted to UTC.
      obj["isUTC"] = true;
    }
    // If the property is an object, recursively adjust its dates
    else if (typeof obj[key] === "object") {
      adjustDates(obj[key], dateConversionFunction);
    }
  }
};