export function getShortMonthName(monthNumber, locale = 'en-US') {
    // Create a Date object for the first day of the given month
    const date = new Date(2000, monthNumber - 1); // Months are 0-based in JavaScript
  
    // Use Intl.DateTimeFormat to format the month name
    const formattedMonth = new Intl.DateTimeFormat(locale, { month: 'short' });
  
    // Get the short month name
    return formattedMonth.format(date);
  }
  
//   // Example usage:
//   console.log(getShortMonthName(1));  // "Jan"
//   console.log(getShortMonthName(2));  // "Feb"
//   console.log(getShortMonthName(12)); // "Dec"

export function getMonthName(monthNumber, locale = 'en-US') {
    const date = new Date(2000, monthNumber - 1);
    const formattedMonth = new Intl.DateTimeFormat(locale, { month: 'long'});
    return formattedMonth.format(date);
}


