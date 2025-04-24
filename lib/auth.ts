/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { signInEmailPassword } from '@/actions/auth';

export const authConfig: NextAuthConfig = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				// name: { label: 'Name', type: 'text', placeholder: 'Luis' },
				email: { label: 'Email', type: 'email', placeholder: 'example@google.com' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials, req) => {
				// const name = credentials.name as string;
				const name = '';
				const email = credentials.email as string;
				const password = credentials.password as string;

				const user = await signInEmailPassword(email, name, password);

				return user;
			},
		}),
	],
	session: { strategy: 'jwt' },
	callbacks: {
		signIn: async ({ user, account, profile, email, credentials }) => {
			return true;
		},
		jwt: async ({ token, user, profile, account }) => {
			const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

			if (!dbUser) throw new Error('User not found');

			token.id = dbUser?.id ?? 'no-uuid';

			return token;
		},
		session: async ({ session, token, user }) => {
			if (!session || !session.user) return session;

			session.user.id = token.id;
			session.user.roles = token.roles;

			return session;
		},
	},
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
