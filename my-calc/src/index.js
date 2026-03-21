import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// --- КРОК 1: ІНТЕГРАЦІЯ SENTRY SDK ---
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://444dfe613806e312c7b98099f8ea2ec3@o4511083139366912.ingest.us.sentry.io/4511083142840320",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: "development", 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);