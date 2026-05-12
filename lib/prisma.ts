import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // Prisma 7 needs explicit options
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
