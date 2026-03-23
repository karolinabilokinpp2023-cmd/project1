import { useState } from 'react';
import posthog from 'posthog-js'; 
import { useFeatureFlagEnabled } from 'posthog-js/react';

// --- ЛАБОРАТОРНА РОБОТА №6: ВІДСТЕЖЕННЯ ПОМИЛОК ---
import * as Sentry from "@sentry/react";

import {
  requireTwoNumbers,
  requireOneNumber,
  add,
  subtract,
  multiply,
  divide,
  percent,
} from './utils/calc';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  // --- ЛАБОРАТОРНА РОБОТА №5: FEATURE FLAGS ---
  // Перевірка прапорця "show-c-button" з панелі PostHog
  const isClearButtonVisible = useFeatureFlagEnabled('show-c-button');

  // --- ЛАБОРАТОРНА РОБОТА №6: ШТУЧНА ПОМИЛКА ---
  const handleBreakWorld = () => {
    // Додаємо Breadcrumb для Sentry, щоб бачити шлях користувача до помилки
    Sentry.addBreadcrumb({
      category: 'ui',
      message: 'User clicked Break the World button',
      level: 'info',
    });

    // Генеруємо помилку для перевірки моніторингу
    throw new Error("Sentry Test Error: " + (num1 || "No values") + " caused a crash!"); 
  };

  // --- ЛАБОРАТОРНА РОБОТА №5: ТРЕКІНГ ПОДІЙ ---
  const captureCalc = (operationName) => {
    posthog.capture('calculation_performed', {
      operation: operationName,
      interface_language: 'ua'
    });
  };

  const handleClear = () => {
    posthog.capture('calculator_clear'); 
    setNum1('');
    setNum2('');
    setResult(0);
  };

  const handleAdd = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    captureCalc('add'); 
    setResult(add(r.a, r.b));
  };

  const handleSubtract = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    captureCalc('subtract');
    setResult(subtract(r.a, r.b));
  };

  const handleMultiply = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    captureCalc('multiply');
    setResult(multiply(r.a, r.b));
  };

  const handleDivide = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    const d = divide(r.a, r.b);
    if (!d.ok) return setResult(d.error);
    captureCalc('divide');
    setResult(d.value);
  };

  const handlePercent = () => {
    const r = requireOneNumber(num1);
    if (!r.ok) return setResult(r.error);
    captureCalc('percent');
    setResult(percent(r.a));
  };

  return (
    <div
      style={{
        padding: '50px',
        textAlign: 'center',
        backgroundColor: '#282c34',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <h1>Мій Калькулятор 🧮</h1>
      <p>Mode: {process.env.REACT_APP_STATUS}</p>

      <div style={{ marginBottom: '16px' }}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Число 1"
          style={{ padding: '6px', marginRight: '10px' }}
        />

        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Число 2"
          style={{ padding: '6px' }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button style={{ backgroundColor: 'orange', marginRight: '10px', cursor: 'pointer' }} onClick={handleAdd}>+</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px', cursor: 'pointer' }} onClick={handleSubtract}>-</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px', cursor: 'pointer' }} onClick={handleMultiply}>*</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px', cursor: 'pointer' }} onClick={handleDivide}>/</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px', cursor: 'pointer' }} onClick={handlePercent}>%</button>

        {/* Кнопка "C" з'являється тільки якщо Feature Flag увімкнено в PostHog */}
        {isClearButtonVisible === true && (
          <button style={{ backgroundColor: 'orange', cursor: 'pointer' }} onClick={handleClear}>
            C
          </button>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <button 
          style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} 
          onClick={handleBreakWorld}
        >
          Break the world (Sentry Test)
        </button>
      </div>

      <h2 style={{ marginTop: '20px' }}>Результат: {result}</h2>
    </div>
  );
}

export default App;