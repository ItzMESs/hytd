import { useState } from "react";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import { IconMail, IconLock, IconEye, IconWarning } from "../components/icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Loaded dynamically (browser-only): a static top-level
    // `import ... from "next-auth/react"` also gets evaluated during
    // Next.js's server-side "Collecting page data" build step, and that
    // module's own URL parsing can throw "Invalid URL" in that context.
    const { signIn } = await import("next-auth/react");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("И-мэйл эсвэл нууц үг буруу байна.");
      return;
    }
    window.location.href = "/";
  }

  return (
    <>
      <Head>
        <title>Нэвтрэх — HSK Path</title>
      </Head>
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="mark">汉</span>
            <div className="auth-brand-text">
              <span className="name">HSK Path</span>
              <span className="tagline">Хятад хэл сурах платформ</span>
            </div>
          </div>
          <div className="hsk-dots" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <h1>Тавтай морил, дахин нэвтэрцгээе</h1>
          {error && (
            <div className="auth-error">
              <IconWarning />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">И-мэйл</label>
              <div className="auth-input-wrap">
                <IconMail />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="auth-field">
              <label htmlFor="password">Нууц үг</label>
              <div className="auth-input-wrap">
                <IconLock />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  data-pw-field
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-visibility"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Нууц үг нуух" : "Нууц үг харуулах"}
                  tabIndex={-1}
                >
                  <IconEye off={showPassword} />
                </button>
              </div>
            </div>
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>
          </form>
          <div className="auth-switch">
            Бүртгэлгүй юу? <a href="/signup">Бүртгүүлэх</a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
}
