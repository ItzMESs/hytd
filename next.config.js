// next-auth v4 (imported by pages/_app.js, which every page shares) parses
// NEXTAUTH_URL into a URL object as soon as its module loads — including
// during Next.js's server-side "Collecting page data" build step, not just
// at runtime. If NEXTAUTH_URL isn't set (e.g. before you've configured it
// on Vercel), that parse can throw and fail the build entirely. Vercel
// always injects VERCEL_URL (the deployment's own hostname, no protocol)
// automatically, with no setup needed, so we fall back to that whenever
// NEXTAUTH_URL isn't explicitly set — this is next-auth's own documented
// pattern for deploying to Vercel. Explicitly setting NEXTAUTH_URL (see
// README) is still recommended for production, since it pins the app to a
// stable domain rather than a per-deployment one, but this fallback means
// the build never breaks even before that's configured.
const resolvedNextAuthUrl =
  process.env.NEXTAUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: resolvedNextAuthUrl,
  },
};

module.exports = nextConfig;
