import { auth } from '@/lib/auth';

export const getUserSessionServer = async () => {
	const session = await auth();

	return session;
};
