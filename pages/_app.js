import "../styles/hskpath.css";
import "../styles/auth.css";

// No <SessionProvider> here on purpose: nothing in this app calls
// next-auth/react's useSession() (every page gets its session server-side,
// via getServerSession() inside getServerSideProps, and signIn()/signOut()
// are loaded dynamically where they're used — see pages/login.js,
// pages/signup.js, pages/index.js). Importing "next-auth/react" at module
// scope here would load it into every single page's server bundle (since
// _app.js wraps all of them), and that module resolves NEXTAUTH_URL into a
// URL object as soon as it loads — including during Next.js's server-side
// "Collecting page data" build step, where it can throw "Invalid URL" if
// that env var isn't resolvable. Keeping "next-auth/react" out of _app.js
// entirely avoids that regardless of environment configuration.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
