import { useState } from "react";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Нууц үг таарахгүй байна.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Бүртгэл амжилтгүй боллоо.");
        setLoading(false);
        return;
      }
      // Auto-login right after signup. Loaded dynamically (browser-only):
      // see the comment in pages/login.js for why.
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", { email, password, redirect: false });
      setLoading(false);
      if (result?.error) {
        window.location.href = "/login";
        return;
      }
      window.location.href = "/";
    } catch (err) {
      setLoading(false);
      setError("Сүлжээний алдаа гарлаа. Дахин оролдоно уу.");
    }
  }

  return (
    <>
      <Head>
        <title>Бүртгүүлэх — HSK Path</title>
      </Head>
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="mark">汉</span>
            <span className="name">HSK Path</span>
          </div>
          <h1>Бүртгүүлэх</h1>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">И-мэйл</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Нууц үг (дор хаяж 6 тэмдэгт)</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirm">Нууц үг давтах</label>
              <input
                id="confirm"
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
            </button>
          </form>
          <div className="auth-switch">
            Бүртгэлтэй юу? <a href="/login">Нэвтрэх</a>
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
