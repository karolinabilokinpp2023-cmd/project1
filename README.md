# Мій Калькулятор (MVP) 🧮

[![CI/CD Pipeline](https://github.com/karolinabilokinpp2023-cmd/project1/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/karolinabilokinpp2023-cmd/project1/actions/workflows/ci-cd.yml)

**Live Demo:** [https://project1-omega-amber.vercel.app/](https://project1-omega-amber.vercel.app/)

Це прототип простого калькулятора, створений у межах вивчення дисципліни "Управління проєктами".

## Мета проєкту
Створення базової робочої версії (Minimum Viable Product) для демонстрації навичок розробки на React та управління версіями через Git, а також автоматизації життєвого циклу через CI/CD[cite: 3, 4].

## Структура папок
`my-calc/`
* **node_modules/** — Зовнішні бібліотеки та залежності (ігноруються Git).
* **public/** — Статичні ресурси проєкту (index.html).
* **src/** — Вихідний код (логіка App.js та точка входу index.js).
* **.gitignore** — Список файлів, що не завантажуються в репозиторій.
* **package.json** — Конфігурація проєкту, список бібліотек та скрипти.
* **.github/workflows/** — Конфігурація CI/CD пайплайну[cite: 77, 81].

## Автоматизація (CI/CD)
У проєкті налаштовано автоматичний конвеєр:
1. **Continuous Integration (CI):** При кожному push або pull request запускаються лінтер та unit-тести[cite: 32, 89].
2. **Continuous Deployment (CD):** Після успішних перевірок код автоматично розгортається на платформі Vercel[cite: 36, 73].

## Як запустити локально
1. Перейдіть у папку проєкту: `cd my-calc`
2. Встановіть залежності: `npm install`
3. Запустіть додаток: `npm start`