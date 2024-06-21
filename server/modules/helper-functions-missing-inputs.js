function convertToDatesWeHave(dbResRows) {
  return dbResRows.map((row) => [row.year, row.month]);
}



function generateDatesWeShouldHave() {
  // Initialized to the [Number('YYYY'), Number('MM')] a user registered:
  const monthToAdd = [2023, 8]; // 👈 HARDCODED
  // Initialized to the [Number('YYYY'), Number('MM')] of current date:
  const final = [2024, 6]; // 👈 HARDCODED

  // Should 100% of the time include the [YYYY, MM] value that
  // represents when the user registered:
  let shouldHave = [[...monthToAdd]];

  // Should include any additional months between registration
  // and current [YYYY, MM]:
  // Loop for as long as `monthToAdd` reaches the value of `final`
  // Translation of this 👇 gross-lookin' thing --> While: ( year is less || (year is equal && month is less) )
  while (
    monthToAdd[0] < final[0] ||
    (monthToAdd[0] === final[0] && monthToAdd[1] < final[1])
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

module.exports = {
  convertToDatesWeHave,
  generateDatesWeShouldHave,
};
