import { getUserSessionServer } from '@/actions/auth';
import { Navbar } from '@/components/ui/navbar';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
	const session = await getUserSessionServer();

	if (!session) redirect('/api/auth/signin');

	return (
		<>
			<Navbar />

			{/* Content */}
			<main className='max-w-7xl mx-auto mt-8'>{children}</main>
		</>
	);
}
