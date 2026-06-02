import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initPosthog } from './lib/posthog'

async function bootstrap() {
  const root = ReactDOM.createRoot(document.getElementById('root'))

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )

  const [{ initSentry }, { Analytics }, { SpeedInsights }] = await Promise.all([
    import('./lib/sentry'),
    import('@vercel/analytics/react'),
    import('@vercel/speed-insights/react'),
  ])

  const Sentry = await initSentry()
  void initPosthog()

  if (Sentry) {
    root.render(
      <React.StrictMode>
        <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
          <App />
          <Analytics />
          <SpeedInsights />
        </Sentry.ErrorBoundary>
      </React.StrictMode>,
    )
    return
  }

  root.render(
    <React.StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </React.StrictMode>,
  )
}

bootstrap()
