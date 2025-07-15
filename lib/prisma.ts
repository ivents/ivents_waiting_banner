import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enables logging
});

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;

export default prisma;
