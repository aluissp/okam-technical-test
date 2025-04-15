'use server';

import { signOut } from '@/lib/auth';

/**
 * Logs out the current user by invalidating their session.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export const logout = async (): Promise<void> => {
	await signOut();
};
