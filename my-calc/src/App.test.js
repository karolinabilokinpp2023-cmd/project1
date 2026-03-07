import { render, screen } from '@testing-library/react';
import App from './App';

test('відображається заголовок калькулятора', () => {
  render(<App />);
  expect(screen.getByText(/мій калькулятор/i)).toBeInTheDocument();
});

test('відображаються кнопки операцій', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '*' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '/' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '%' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
});