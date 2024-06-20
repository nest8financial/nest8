/**
 * Utilities for use by multiple components
 */


// Date Utilities ------------------------------------------------------------

//  Get a month name from a month number
//      How to use: 
//          console.log(getMonthName(2)); 
//           -returns:   "February"
//             (default locale to english US)
export function getMonthName(monthNumber, locale = 'en-US') {
    console.log("month Number", monthNumber)
    // return blank if no month
    if (!monthNumber || monthNumber === '' || monthNumber === 0) {
        return '';
    } 
    monthNumber = Number(monthNumber);
    const date = new Date(2000, monthNumber - 1);
    const dateTimeFormat = new Intl.DateTimeFormat(locale, { month: 'long'});
    const parts = dateTimeFormat.formatToParts(date);
    const monthName = parts.find(part => part.type === 'month').value;
    return monthName;
}

//  Get a Short (3-letter) month name from a month number 
//  How to use: 
//   console.log(getShortMonthName(2));  
//   -returns:   "Feb"
//       (default locale to english US)
export function getShortMonthName(monthNumber, locale = 'en-US') {
    // return blank if no month
    if (monthNumber === '' || monthNumber === 0) {
        return '';
    } 
    monthNumber = Number(monthNumber);
    // Create a Date object for the first day of the given month
    const date = new Date(2000, monthNumber - 1); // Months are 0-based in JavaScript
    // Use Intl.DateTimeFormat to format the month name
    const dateTimeFormat = new Intl.DateTimeFormat(locale, { month: 'short' });
    const parts = dateTimeFormat.formatToParts(date);
    const monthName = parts.find(part => part.type === 'month').value;
    return monthName;
  }


// (end Date Utilities)
// --------------------------------------------------------------------------