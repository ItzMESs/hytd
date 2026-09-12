import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import { BODY_HTML } from "../components/bodyHtml";

export default function Home({ user }) {
  useEffect(() => {
    // Imported dynamically (browser-only) rather than at module scope: a
    // static top-level `import ... from "next-auth/react"` gets evaluated
    // by Next.js during the server-side "Collecting page data" build step
    // too, and next-auth/react's module-level URL parsing can throw
    // "Invalid URL" there if NEXTAUTH_URL isn't resolvable in that context.
    // Loading it only inside this client-only effect avoids that entirely.
    window.__hskLogout = () => {
      const doSignOut = () =>
        import("next-auth/react").then(({ signOut }) =>
          signOut({ callbackUrl: "/login" })
        );
      // app.js debounces saves by ~700ms so rapid actions don't spam the
      // server. Logging out right after marking a card, finishing a quiz,
      // or creating a deck could previously race that debounce and lose the
      // change. window.__hskFlushSave (set by app.js) forces any pending
      // save to go out first; a short timeout keeps logout from hanging if
      // that save is slow or the network is down.
      const flush =
        typeof window.__hskFlushSave === "function"
          ? Promise.resolve(window.__hskFlushSave()).catch(() => {})
          : Promise.resolve();
      const timeout = new Promise((resolve) => setTimeout(resolve, 1500));
      Promise.race([flush, timeout]).then(doSignOut);
    };
  }, []);

  return (
    <>
      <Head>
        <title>HSK Path</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700&family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        {/* Applies the saved Цайвар/Бараан/Системийнх choice before first paint,
            so switching pages (or a full reload) never flashes the wrong theme
            for a moment before app.js runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("hsk-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
      </Head>

      {/* Injected before app.js runs, so it can read the signed-in user's id/email
          (used for "(Та)" highlighting on the leaderboard and the header pill). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__HSK_USER__ = ${JSON.stringify({ id: user.id, email: user.email })};`,
        }}
      />

      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />

      {/* The entire HSK Path app (lessons, SRS review, quizzes, games, leaderboard)
          lives in public/app.js — a near-verbatim port of the original single-file
          app, with only the persistence layer swapped to call /api/progress and
          /api/leaderboard instead of Claude's artifact `db` capability. */}
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session?.user) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return {
    props: {
      user: { id: session.user.id, email: session.user.email },
    },
  };
}
