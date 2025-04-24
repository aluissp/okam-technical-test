'use server';

import { auth, signOut } from '@/lib/auth';
import { createUser } from './user';

/**
 * Logs out the current user by invalidating their session.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export const logout = async (): Promise<void> => {
	await signOut();
};

export const getUserSession = async () => {
	const session = await auth();

	return session;
};

export const registerUser = async (
	name: string,
	email: string,
	password: string,
	organizationId: string
) => {
	const user = await createUser(name, email, password, organizationId);

	if (!user) return { error: 'User already exists' };

	return { user };
};
