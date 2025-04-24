import { redirect } from 'next/navigation';

// import { auth } from '@/lib/auth';

interface Props {
	children: React.ReactNode;
}
export default async function AuthLayout({ children }: Props) {
	// const session = await auth();

	// if (session?.user) redirect('/');

	return (
		<main className='flex justify-center'>
			<div className='w-full sm:w-[450px] px-10'>{children}</div>
		</main>
	);
}
