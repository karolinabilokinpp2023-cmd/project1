import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  const handleAdd = () => {
    if (num1 === '' || num2 === '') {
      setResult('Введіть числа');
      return;
    }
    setResult(Number(num1) + Number(num2));
  };

  const handlePercent = () => {
    if (num1 === '') {
      setResult('Введіть число');
      return;
    }
    setResult(Number(num1) / 100);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>

      <h1>Мій Калькулятор 🧮 ВЕРСІЯ В</h1>


      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
      <span style={{ fontSize: '24px' }}> + </span>
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />

      <div style={{ marginTop: '20px' }}>
        <button style={{ backgroundColor: 'orange', marginRight: '10px' }} onClick={handleAdd}>
          =
        </button>

        <button style={{ backgroundColor: 'orange' }} onClick={handlePercent}>
          %
        </button>
      </div>

      <h2>Результат: {result}</h2>
    </div>
  );
}

export default App;