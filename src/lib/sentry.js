export async function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn) return null

  const Sentry = await import('@sentry/react')

  Sentry.init({
    dsn,
    integrations: [
      Sentry.replayIntegration(),
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
    ],
    enableLogs: true,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1,
    sendDefaultPii: false,
    ignoreErrors: [
      /Failed to fetch dynamically imported module.*posthog/i,
    ],
  })

  return Sentry
}
