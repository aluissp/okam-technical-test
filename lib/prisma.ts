import { PrismaClient } from '@prisma/client';

const globalPrisma = global as typeof globalThis & { prisma: PrismaClient };

if (process.env.NODE_ENV !== 'production' && !globalPrisma.prisma) {
	globalPrisma.prisma = new PrismaClient();
}

const prisma = process.env.NODE_ENV === 'production' ? new PrismaClient() : globalPrisma.prisma;

export default prisma;
