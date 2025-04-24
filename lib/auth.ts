import Credentials from 'next-auth/providers/credentials';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import { checkUserCredentials } from '@/actions/auth';
import prisma from '@/lib/prisma';

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: '/auth/login',
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async credentials => {
				const email = credentials.email as string;
				const password = credentials.password as string;

				const user = await checkUserCredentials(email, password);

				if (!user) return null;

				const { password: _, ...restUser } = user;

				return restUser;
			},
		}),
	],
	session: { strategy: 'jwt' },
	callbacks: {
		jwt: async ({ token }) => {
			const dbUser = await prisma.user.findUnique({
				where: { email: token.email ?? 'no-email' },
				include: { organization: true },
			});

			if (!dbUser) throw new Error('User not found');

			token.id = dbUser?.id ?? 'no-uuid';
			token.organizationId = dbUser?.organizationId ?? 'no-uuid';
			token.organizationName = dbUser?.organization?.name ?? 'no-name';

			return token;
		},
		session: async ({ session, token }) => {
			if (!session || !session.user) return session;

			session.user.id = token.id;
			session.user.organizationId = token.organizationId;

			return session;
		},
	},
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
