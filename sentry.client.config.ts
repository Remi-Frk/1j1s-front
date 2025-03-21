// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const DEFAULT_SENTRY_CLIENT_ENVIRONMENT = 'local';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'production' || process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'integration',
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || DEFAULT_SENTRY_CLIENT_ENVIRONMENT,
  // Adjust this value in production, or use tracesSampler for greater control
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  tracesSampleRate: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
