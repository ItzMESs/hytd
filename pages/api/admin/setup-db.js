import { prisma } from "../../../lib/prisma";

// One-time, browser-triggerable setup endpoint: creates the User/Progress
// tables directly (matching prisma/schema.prisma) for people who can't run
// `npx prisma db push` from a terminal against the production database.
// Visit /api/admin/setup-db?key=<your NEXTAUTH_SECRET> once after the
// Postgres database is connected. Safe to run more than once — every
// statement is written so "already exists" just gets skipped.
const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE TABLE IF NOT EXISTS "Progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "nickname" TEXT NOT NULL DEFAULT '',
    "challenge" TEXT NOT NULL DEFAULT '',
    "mastered" INTEGER NOT NULL DEFAULT 0,
    "learned" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Progress_userId_key" ON "Progress"("userId")`,
  `CREATE INDEX IF NOT EXISTS "Progress_mastered_idx" ON "Progress"("mastered")`,
  `ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
  // Added later (profile avatar picker) — IF NOT EXISTS makes this safe to
  // run again on a database that was already set up before this column existed.
  `ALTER TABLE "Progress" ADD COLUMN IF NOT EXISTS "avatarEmoji" TEXT NOT NULL DEFAULT ''`,
];

export default async function handler(req, res) {
  // .trim() guards against a stray trailing space/newline that can sneak in
  // when pasting a secret into Vercel's Environment Variables textarea.
  const provided = (req.query.key || "").trim();
  const configured = (process.env.NEXTAUTH_SECRET || "").trim();
  if (!configured || provided !== configured) {
    return res.status(403).json({
      error: "Forbidden — wrong or missing ?key=",
      // Safe hint for debugging a mismatch without leaking the actual secret.
      debug: {
        secretIsSet: Boolean(process.env.NEXTAUTH_SECRET),
        secretLength: configured.length,
        providedLength: provided.length,
      },
    });
  }

  const results = [];
  for (const sql of STATEMENTS) {
    try {
      await prisma.$executeRawUnsafe(sql);
      results.push({ statement: sql.split("\n")[0].trim(), ok: true });
    } catch (e) {
      const msg = e?.message || String(e);
      const alreadyExists = /already exists/i.test(msg);
      results.push({
        statement: sql.split("\n")[0].trim(),
        ok: alreadyExists,
        note: alreadyExists ? "already existed, skipped" : undefined,
        error: alreadyExists ? undefined : msg,
      });
      if (!alreadyExists) {
        return res.status(500).json({ ok: false, results });
      }
    }
  }
  return res.status(200).json({ ok: true, message: "User/Progress tables are ready.", results });
}
