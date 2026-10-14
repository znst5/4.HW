export function validateLuhn(cardNumber) {
  const value = String(cardNumber).replace(/\s+/g, '');
  if (!value || !/^\d+$/.test(value)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function getCardPaySystem(cardNumber) {
  const value = String(cardNumber).trim();
  if (!value) return null;
  if (/^4/.test(value)) return 'visa';
  if (/^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)/.test(value)) return 'mastercard';
  if (/^220[0-4]/.test(value)) return 'mir';
  if (/^3[47]/.test(value)) return 'amex';
  if (/^(352[89]|35[3-8][0-9])/.test(value)) return 'jcb';
  if (/^(30[0-5]|3095|36|38|39)/.test(value)) return 'diners';
  if (/^(6011|65|64[4-9])/.test(value)) return 'discover';

  return null;
}
