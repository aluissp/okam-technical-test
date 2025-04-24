import { getUserSession } from '@/actions/auth';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}
export default async function AuthLayout({ children }: Props) {
	const session = await getUserSession();

	if (session?.user) redirect('/');

	return (
		<main className='flex justify-center'>
			<div className='w-full sm:w-[450px] px-10'>{children}</div>
		</main>
	);
}
