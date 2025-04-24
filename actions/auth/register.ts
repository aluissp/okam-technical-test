'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const signInEmailPassword = async (email: string, name: string, password: string) => {
	if (!email || !password) return null;

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) return await createUser(name, email, password);

	if (!bcryptjs.compareSync(password, user.password ?? '')) return null;

	return user;
};

const createUser = async (name: string, email: string, password: string) => {
	const organizationId = 'f89d2ac9-494b-4316-b475-e1aec06b9f60';
	const user = await prisma.user.create({
		data: {
			name,
			email,
			organizationId,
			password: bcryptjs.hashSync(password),
		},
	});

	return user;
};
