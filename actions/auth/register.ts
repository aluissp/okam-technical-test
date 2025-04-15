'use server';

import { AuthRegisterResponse } from '@/interfaces/auth.interface';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

/**
 * Registers a new user in the database.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {string} organizationId - The ID of the organization the user belongs to.
 * @returns {Promise<AuthRegisterResponse>} A promise that resolves with the registration response, including the status and user data.
 */
export const registerUser = async (
	name: string,
	email: string,
	password: string,
	organizationId: string
): Promise<AuthRegisterResponse> => {
	try {
		const user = await prisma.user.create({
			data: {
				name: name,
				email: email.toLowerCase(),
				password: bcryptjs.hashSync(password),
				organization: { connect: { id: organizationId } },
			},
			select: {
				id: true,
				name: true,
				email: true,
				organizationId: true,
				createdAt: true,
			},
		});

		return {
			ok: true,
			user: user,
			message: 'User created successfully',
		};
	} catch (_error) {
		return {
			ok: false,
			message: 'User creation failed',
		};
	}
};
