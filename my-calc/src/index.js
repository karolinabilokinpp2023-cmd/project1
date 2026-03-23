import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 1. Імпортуємо Sentry
import * as Sentry from "@sentry/react";
// 2. Імпортуємо PostHog та його Провайдер
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// --- ЛАБОРАТОРНА РОБОТА №6: ІНІЦІАЛІЗАЦІЯ SENTRY ---
Sentry.init({
  dsn: "https://444dfe613806e312c7b98099f8ea2ec3@o4511083139366912.ingest.us.sentry.io/4511083142840320",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: "development",
});

// Налаштування користувача для Sentry
Sentry.setUser({
  id: "KAROLINA-2026",
  email: "karolina.bilokin.pp.2023@lpnu.ua",
  username: "Karolina",
});
Sentry.setTag("user_segment", "premium_user");

// --- ЛАБОРАТОРНА РОБОТА №5: ІНІЦІАЛІЗАЦІЯ POSTHOG ---
posthog.init('phc_YjbLCVOCBzzlTtlcPsgue9RQFxnhhQDWtgDBTMVqFS4', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ГОРТАЄМО В ПРОВАЙДЕР, ЩОБ FEATURE FLAGS ПРАЦЮВАЛИ */}
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);