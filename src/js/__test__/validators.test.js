import { validateLuhn, getCardPaySystem } from '../validators';

describe('Проверка функций валидации', () => {
  test('Алгоритм Луна должен верно определять валидный номер', () => {
    expect(validateLuhn('4532715112955556')).toBe(true);
  });

  test('getCardPaySystem должен верно определять Visa', () => {
    expect(getCardPaySystem('4532715112955556')).toBe('visa');
  });
});
