

function convertToDatesWeHave(dbResRows) {
  return dbResRows.map((row) => [row.year, row.month]);
}



function generateDatesWeShouldHave(monthToAdd) {
  // Passed in the joindate as the monthToAdd. Formatted to the [Number('YYYY'), Number('MM')] 

  // Initialized to the [Number('YYYY'), Number('MM')] of current date:
  const today = new Date(); // pulls the current date
  const year = today.getFullYear()
  const month = today.getMonth() + 1;
  const currentMonthYear = [year, month] // reformats to provide just the month and year as integers in an array 

  // Should 100% of the time include the [YYYY, MM] value that
  // represents when the user registered:
  let shouldHave = [[...monthToAdd]];

  // Should include any additional months between registration
  // and current [YYYY, MM]:
  // Loop for as long as `monthToAdd` reaches the value of `currentMonthYear`
  // Translation of this 👇 gross-lookin' thing --> While: ( year is less || (year is equal && month is less) )
  while (
    monthToAdd[0] < currentMonthYear[0] ||
    (monthToAdd[0] === currentMonthYear[0] && monthToAdd[1] < currentMonthYear[1])
  ) {
    if (monthToAdd[1] < 12) {
      // If monthToAdd[1] < 12, increment it
      monthToAdd[1]++;
    } else {
      // Else, increment monthToAdd[0] AND set monthToAdd[1] to 1
      monthToAdd[0]++; // Happy New Year! 🎉
      monthToAdd[1] = 1;
    }
    shouldHave.push([...monthToAdd]);
  }

  return shouldHave;
}

// Returns true if `toCheck` is NOT in `toLookThrough`.
// Returns false if `toCheck` is in `toLookThrough`.
function checkForMissingMonthYear(toCheck, toLookThrough) {
    // If we find `toCheck` inside `toLookThrough`, return false:
    for (let submittedMonthYear of toLookThrough) {
      if (toCheck[0] === submittedMonthYear[0] && toCheck[1] === submittedMonthYear[1]) {
        // It's not missing! Nice job, user!
        return false
      }
    }
    // If we don't `toCheck` inside `toLookThrough`, return true:
    return true
  }
  


function getMissingMonths(monthsShouldHave, monthsWeHave) {
    // Create a missingMonths array:
    let missingMonths = []
  
    // Loop through monthsShouldHave:
    for (let monthYear of monthsShouldHave) {
      // Will be true or false, depending on whether it is missing:
      let isMissing = checkForMissingMonthYear(monthYear, monthsWeHave)
      
      // If it is missing, we store it in missingMonths:
      if (isMissing === true) {
        missingMonths.push(monthYear)
      }
    }
  
    // Return missingMonths:
    return missingMonths
  }

function getMonthName(monthNumber, locale = 'en-US') {
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

module.exports = {
  convertToDatesWeHave,
  generateDatesWeShouldHave,
  getMissingMonths,
  getMonthName
};
