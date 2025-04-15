/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/new-account',
	},
	session: { strategy: 'jwt' },
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			return true;
		},

		jwt({ token, user }) {
			if (user) token.data = user;

			return token;
		},

		session({ session, token, user }) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			session.user = token.data as any;

			return session;
		},
	},

	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(8) })
					.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				const { email, password } = parsedCredentials.data;

				// Search the user by email
				const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

				if (!user) return null;

				// Check if the password is correct
				if (!bcryptjs.compareSync(password, user.password)) return null;

				// Remove the password from the user
				const { password: _, ...rest } = user;

				return rest;
			},
		}),
	],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
