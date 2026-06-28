let client = null
let initPromise = null
let loadFailed = false

export function initPosthog() {
  const key = import.meta.env.VITE_POSTHOG_KEY
  if (!key || loadFailed) return Promise.resolve(null)

  if (client) return Promise.resolve(client)
  if (initPromise) return initPromise

  initPromise = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: import.meta.env.VITE_POSTHOG_HOST,
        defaults: '2026-01-30',
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
      })
      client = posthog
      return posthog
    })
    .catch(() => {
      loadFailed = true
      initPromise = null
      return null
    })

  return initPromise
}

export function capture(event, properties) {
  initPosthog()
    .then((posthog) => {
      if (posthog) posthog.capture(event, properties)
    })
    .catch(() => {})
}

export function identify(distinctId, properties) {
  initPosthog()
    .then((posthog) => {
      if (posthog) posthog.identify(distinctId, properties)
    })
    .catch(() => {})
}
