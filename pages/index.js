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
      import("next-auth/react").then(({ signOut }) =>
        signOut({ callbackUrl: "/login" })
      );
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
