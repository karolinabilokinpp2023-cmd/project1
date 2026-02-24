import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Мій Калькулятор 🧮</h1>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
      <span style={{ fontSize: '24px' }}> + </span>
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
      <button onClick={() => setResult(Number(num1) + Number(num2))}>=</button>
      <h2>Результат: {result}</h2>
    </div>
  );
}

export default App;