// my-calc/src/utils/calc.js

export const parseNumber = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

export const requireTwoNumbers = (aStr, bStr) => {
  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  if (a === null || b === null) return { ok: false, error: 'Введіть два числа' };
  return { ok: true, a, b };
};

export const requireOneNumber = (aStr) => {
  const a = parseNumber(aStr);
  if (a === null) return { ok: false, error: 'Введіть число' };
  return { ok: true, a };
};

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

export const divide = (a, b) => {
  if (b === 0) return { ok: false, error: 'Ділення на нуль неможливе' };
  return { ok: true, value: a / b };
};

export const percent = (a) => a / 100;