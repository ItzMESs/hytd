import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = (req.body?.email || "").trim().toLowerCase();
  const password = req.body?.password || "";

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "И-мэйл хаяг буруу байна." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой." });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Энэ и-мэйл хаягаар аль хэдийн бүртгүүлсэн байна." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      progress: {
        create: {
          data: {},
          nickname: email.split("@")[0].slice(0, 24),
        },
      },
    },
  });

  return res.status(201).json({ id: user.id, email: user.email });
}
