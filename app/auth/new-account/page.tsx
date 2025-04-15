import { getAllOrganization } from '@/actions/organization/organization';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default async function NewAccountPage() {
	const organizations = await getAllOrganization();

	return (
		<div className='flex flex-col min-h-screen pt-32'>
			<h1 className='text-4xl mb-5 text-center'>Create a new account</h1>

			<RegisterForm organizations={organizations} />
		</div>
	);
}
