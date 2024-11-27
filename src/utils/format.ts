export function getCharacterBirthYear(birthYear: string): string {
  // Handle unknown or empty values
  if (!birthYear || birthYear.toLowerCase() === 'unknown') {
    return 'unknown';
  }

  // Base date (Battle of Yavin)
  const yavinDate = new Date('1977-05-25');

  // Extract numeric value and determine if it's BBY or ABY
  const cleanValue = birthYear.toLowerCase();
  const isBBY = cleanValue.includes('bby');
  const isABY = cleanValue.includes('aby');

  if (!isBBY && !isABY) {
    return 'unknown';
  }

  // Extract the number and convert to float
  const years = parseFloat(cleanValue.replace(/[a-z]/g, ''));

  if (isNaN(years)) {
    return 'unknown';
  }

  // Calculate the date
  const resultDate = new Date(yavinDate);
  const yearAdjustment = isBBY ? -years : years;

  // Adjust the year
  resultDate.setFullYear(yavinDate.getFullYear() + yearAdjustment);

  // Handle decimal years by adjusting months
  const decimalPart = years % 1;
  if (decimalPart > 0) {
    const monthsToAdd = Math.round(decimalPart * 12);
    resultDate.setMonth(
      resultDate.getMonth() + (isBBY ? -monthsToAdd : monthsToAdd),
    );
  }

  // Format the date as dd-MM-yyyy
  const day = String(resultDate.getDate()).padStart(2, '0');
  const month = String(resultDate.getMonth() + 1).padStart(2, '0');
  const year = resultDate.getFullYear();

  return `${day}-${month}-${year}`;
}
