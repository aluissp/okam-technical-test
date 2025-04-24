// next-auth.d.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface IUser extends DefaultUser {
	id: string;
	roles?: string[];
}

declare module 'next-auth' {
	interface User extends IUser {}

	interface Session {
		user?: User;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends IUser {}
}
