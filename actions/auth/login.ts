'use server';

import { signIn } from '@/lib/auth';
import { AuthLoginResponse } from '@/interfaces/auth.interface';

/**
 * Login a user using their email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<AuthLoginResponse>} A promise that resolves with the login response, including the status and message.
 */
export const login = async (email: string, password: string): Promise<AuthLoginResponse> => {
	try {
		await signIn('credentials', { email, password });

		return { ok: true, message: 'Login successful' };
	} catch (_error) {
		return {
			ok: false,
			message: 'Login failed',
		};
	}
};
