import {
  parseNumber,
  requireTwoNumbers,
  add,
  subtract,
  multiply,
  divide,
  percent,
} from './calc';

test('parseNumber: перетворює "5" у 5', () => {
  expect(parseNumber('5')).toBe(5);
});

test('parseNumber: порожній рядок повертає null', () => {
  expect(parseNumber('')).toBeNull();
});

test('requireTwoNumbers: якщо одне з чисел порожнє — помилка', () => {
  expect(requireTwoNumbers('', '2')).toEqual({ ok: false, error: 'Введіть два числа' });
});

test('add: 2 + 3 = 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('subtract: 10 - 4 = 6', () => {
  expect(subtract(10, 4)).toBe(6);
});

test('multiply: 3 * 4 = 12', () => {
  expect(multiply(3, 4)).toBe(12);
});

test('divide: ділення на 0 повертає помилку', () => {
  expect(divide(5, 0)).toEqual({ ok: false, error: 'Ділення на нуль неможливе' });
});

test('percent: 50% = 0.5', () => {
  expect(percent(50)).toBe(0.5);
});
test('add: результат більший за перше число', () => {
  expect(add(2, 3)).toBeGreaterThan(2);
});

test('percent: 50% менше за 1', () => {
  expect(percent(50)).toBeLessThan(1);
});

test('Mock: перевірка виклику функції add', () => {
  const mockAdd = jest.fn(add);

  mockAdd(2, 3);

  expect(mockAdd).toHaveBeenCalled();
  expect(mockAdd).toHaveBeenCalledWith(2, 3);
});