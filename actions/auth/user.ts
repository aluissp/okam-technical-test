'use server';

import bcryptjs from 'bcryptjs';
import prisma from '@/lib/prisma';
import { User } from '@/prisma/generated';
import { userLoginSchema, userRegisterSchema } from '@/interfaces/models/user.interface';

export const checkUserCredentials = async (
	email: string,
	password: string
): Promise<User | null> => {
	const parsedCredentials = userLoginSchema.safeParse({
		email,
		password,
	});

	if (!parsedCredentials.success) return null;

	const data = parsedCredentials.data;

	const user = await prisma.user.findUnique({ where: { email: data.email } });

	if (!user) return null;

	if (!bcryptjs.compareSync(data.password, user.password ?? '')) return null;

	return user;
};

export const createUser = async (
	name: string,
	email: string,
	password: string,
	organizationId: string
): Promise<User | null> => {
	const parsedCredentials = userRegisterSchema.safeParse({
		name,
		email,
		password,
		organizationId,
	});

	if (!parsedCredentials.success) return null;

	const data = parsedCredentials.data;

	const user = await prisma.user.findUnique({ where: { email: data.email } });

	if (user) return user;

	const newUser = await prisma.user.create({
		data: { ...data, password: bcryptjs.hashSync(data.password) },
	});

	return newUser;
};
