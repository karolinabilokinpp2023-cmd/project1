import { useState } from 'react';
import posthog from 'posthog-js';
import {
  requireTwoNumbers,
  requireOneNumber,
  add,
  subtract,
  multiply,
  divide,
  percent,
} from './utils/calc';

// Ініціалізація PostHog (дані з твого скриншота)
posthog.init('phc_YjbLCVOCBzzlTtlcPsgue9RQFxnhhQDWtgDBTMVqFS4', {
  api_host: 'https://us.posthog.com', 
  person_profiles: 'always'
});

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  // Функція для запису події обчислення
  const captureCalc = (operationName) => {
    posthog.capture('calculation_performed', {
      operation: operationName,
      interface_language: 'ua'
    });
  };

  const handleClear = () => {
    posthog.capture('calculator_clear'); // Відстежуємо очищення
    setNum1('');
    setNum2('');
    setResult(0);
  };

  const handleAdd = () => {
    const r = requireTwoNumbers(num1, num2);
    if (!r.ok) return setResult(r.error);
    captureCalc('add'); // Крок 2: Кастомна подія
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
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleAdd}>
          +
        </button>

        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleSubtract}>
          -
        </button>

        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleMultiply}>
          *
        </button>

        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleDivide}>
          /
        </button>

        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handlePercent}>
          %
        </button>

        <button style={{ backgroundColor: 'orange' }} onClick={handleClear}>
          C
        </button>
      </div>

      <h2 style={{ marginTop: '20px' }}>Результат: {result}</h2>
    </div>
  );
}

export default App;