import { PrismaClient } from "@prisma/client";

// Avoid exhausting the connection pool by reusing a single PrismaClient
// instance across hot reloads in development.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
