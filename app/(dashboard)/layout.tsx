import { Navbar } from '@/components/ui/navbar';

interface Props {
	children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
	// Todo: Implement authentication

	return (
		<>
			<Navbar />

			{/* Content */}
			<main className='max-w-7xl mx-auto mt-8'>{children}</main>
		</>
	);
}
