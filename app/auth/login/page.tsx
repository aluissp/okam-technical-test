import { LoginForm } from '@/components/auth/LoginForm';

export default async function LoginPage() {
	return (
		<div className='flex flex-col min-h-screen pt-32'>
			<h1 className='text-4xl mb-5 text-center'>Create a new account</h1>

			<LoginForm />
		</div>
	);
}
