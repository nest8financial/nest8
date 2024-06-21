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

  export function generateMonthYearArray(startMonth, startYear, endMonth, endYear) {
    const result = [];
    let currentYear = startYear;
    let currentMonth = startMonth;

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
        result.push({ month: currentMonth, year: currentYear });
        // Increment month and handle year change
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
    }
    return result;
}

export function generateMonthShortNameArray(startMonth, startYear, endMonth, endYear) {
    const monthNameArray = [];
    let currentYear = startYear;
    let currentMonth = startMonth;
    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
        monthNameArray.push(getShortMonthName(currentMonth));
        // Increment month and handle year change
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
    }
    console.log(`Here's your array from ${fromYear} ${fromMonth} to ${toYear} ${toMonth}:`, monthNameArray)
    return monthNameArray;
}


// (end Date Utilities)
// --------------------------------------------------------------------------