import { useState } from 'react';
import posthog from 'posthog-js'; // Крок 1: Імпорт бібліотеки аналітики PostHog
import { useFeatureFlagEnabled } from 'posthog-js/react'; // Крок 5: Імпорт хука для роботи з Feature Flags

// --- ЛАБА 6: КРОК 1 (Імпорт SDK Sentry для відстеження помилок)  ---
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

// Крок 1: Ініціалізація PostHog (підключення до проєкту через API Key)
posthog.init('phc_YjbLCVOCBzzlTtlcPsgue9RQFxnhhQDWtgDBTMVqFS4', {
  api_host: 'https://us.i.posthog.com', // Адреса сервера для відправки даних
  person_profiles: 'always' // Дозволяє створювати профілі користувачів для аналізу сесій
});

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  // Крок 5: Перевірка активності прапорця "show-c-button" з панелі PostHog
  // Ця змінна отримує значення true або false дистанційно з адмінки
  const isClearButtonVisible = useFeatureFlagEnabled('show-c-button');

  // --- ЛАБА 6: КРОК 2 (Функція для навмисного виклику помилки)  ---
  const handleBreakWorld = () => {
    // ЛАБА 6: КРОК 1.3 (Додаємо Breadcrumb для контексту налагодження) 
    Sentry.addBreadcrumb({
      category: 'ui',
      message: 'User clicked Break the World button to test Sentry',
      level: 'info',
    });

    throw new Error("Sentry Test Error: " + (num1 || "No values") + " caused a crash!"); 
  };

  // Крок 2: Функція для запису кастомної події обчислення (calculation_performed)
  // Передаємо тип операції як властивість (property), щоб бачити статистику по кожній кнопці 
  const captureCalc = (operationName) => {
    posthog.capture('calculation_performed', {
      operation: operationName,
      interface_language: 'ua'
    });
  };

  const handleClear = () => {
    // Крок 2: Відстежуємо очищення калькулятора користувачем
    posthog.capture('calculator_clear'); 
    setNum1('');
    setNum2('');
    setResult(0);
  };

  const handleAdd = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    
    // Крок 2: Фіксуємо успішне виконання операції додавання
    captureCalc('add'); 
    setResult(add(r.a, r.b));
  };

  const handleSubtract = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    
    // Крок 2: Фіксуємо операцію віднімання
    captureCalc('subtract');
    setResult(subtract(r.a, r.b));
  };

  const handleMultiply = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    
    // Крок 2: Фіксуємо операцію множення
    captureCalc('multiply');
    setResult(multiply(r.a, r.b));
  };

  const handleDivide = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);

    const d = divide(r.a, r.b);
    if (!d.ok) return setResult(d.error);

    // Крок 2: Фіксуємо операцію ділення
    captureCalc('divide');
    setResult(d.value);
  };

  const handlePercent = () => {
    const r = requireOneNumber(num1);
    if (!r.ok) return setResult(r.error);
    
    // Крок 2: Фіксуємо обчислення відсотків
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
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleAdd}>+</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleSubtract}>-</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleMultiply}>*</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleDivide}>/</button>
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handlePercent}>%</button>

        {/* Крок 5: Реалізація "Магії" Feature Flags.
            Кнопка "C" відображається лише тоді, коли прапорець show-c-button увімкнено в PostHog.
            Це дозволяє керувати інтерфейсом без переписування коду. */}
        {isClearButtonVisible && (
          <button style={{ backgroundColor: 'orange' }} onClick={handleClear}>
            C
          </button>
        )}
      </div>

      {/* --- ЛАБА 6: КРОК 2 (Кнопка "Break the world" для симуляції помилок) --- */}
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