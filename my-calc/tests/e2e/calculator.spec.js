const { test, expect } = require('@playwright/test');

test('E2E: додавання 5 + 3 = 8', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Число 1').fill('5');
  await page.getByPlaceholder('Число 2').fill('3');
  await page.getByRole('button', { name: '+' }).click();

  await expect(page.getByText(/Результат:/)).toContainText('8');
});

test('E2E: ділення на нуль показує помилку', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Число 1').fill('5');
  await page.getByPlaceholder('Число 2').fill('0');
  await page.getByRole('button', { name: '/' }).click();

  await expect(page.getByText(/Результат:/)).toContainText('Ділення на нуль неможливе');
});