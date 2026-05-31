import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";

posthog.init(
  import.meta.env.VITE_POSTHOG_KEY,
  {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    defaults: "2026-01-30",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
  }
);

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,

  integrations: [
    Sentry.replayIntegration(),
  ],

  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  sendDefaultPii: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);