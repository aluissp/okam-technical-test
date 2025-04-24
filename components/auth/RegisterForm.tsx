'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '@/interfaces/models/organization.interface';
import { UserRegister, userRegisterSchema } from '@/interfaces/models/user.interface';
import { registerUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface Props {
	organizations: Organization[];
}

export const RegisterForm = ({ organizations }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });

	const onSubmit: SubmitHandler<UserRegister> = async data => {
		const { name, email, password, organizationId } = data;

		// Server action
		const resp = await registerUser(name, email, password, organizationId);

		if (resp?.error) {
			toast.error('User could not be created');
			return;
		}

		const response = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (response?.error) {
			toast.error('User created, but could not log in');
			return;
		}

		toast.success('User created successfully');

		redirect('/');
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col border p-5 rounded-lg shadow-md bg-white text-dark'
		>
			<label htmlFor='name'>Name </label>
			<input
				id='name'
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.name,
				})}
				type='text'
				autoFocus
				{...register('name')}
			/>
			<span className='text-red-500 text-sm mb-2'>{errors.name?.message}</span>

			<label htmlFor='email'>Email</label>
			<input
				id='email'
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.email,
				})}
				type='email'
				{...register('email')}
			/>
			<span className='text-red-500 text-sm mb-2'>{errors.email?.message}</span>

			<label htmlFor='password'>Password</label>
			<input
				id='password'
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.password,
				})}
				type='password'
				{...register('password')}
			/>
			<span className='text-red-500 text-sm mb-2'>{errors.password?.message}</span>

			{/* Create a list with select */}
			<label htmlFor='organizationId'>Organization</label>
			<select
				id='organizationId'
				className='px-5 py-2 border bg-gray-200 rounded mb-5'
				{...register('organizationId')}
			>
				<option value=''>Select an organization</option>
				{organizations.map(organization => (
					<option key={organization.id} value={organization.id}>
						{organization.name}
					</option>
				))}
			</select>
			<span className='text-red-500 text-sm mb-2'>{errors.organizationId?.message}</span>

			<button className='bg-blue-600 text-white rounded-lg p-2 mb-5'> Create Account</button>

			<div className='flex items-center my-5'>
				<div className='flex-1 border-t border-gray-500'></div>
				<div className='px-2 text-gray-800'>Or</div>
				<div className='flex-1 border-t border-gray-500'></div>
			</div>

			<Link href='/auth/login' className='border rounded-lg p-2 text-center'>
				Login
			</Link>
		</form>
	);
};
