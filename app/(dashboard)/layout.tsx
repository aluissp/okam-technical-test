import { SideBar } from '@/components/dashboard/SideBar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
	const session = await auth();

	if (!session?.user) redirect('/auth/login');

	return (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
			<div className='w-full flex-none md:w-64'>
				<SideBar />
			</div>
			<div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
		</div>
	);
}
