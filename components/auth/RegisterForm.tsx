'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '@/interfaces/models/organization.interface';
import { UserRegister, userRegisterSchema } from '@/interfaces/models/user.interface';
import { login } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';

interface Props {
	organizations: Organization[];
}

export const RegisterForm = ({ organizations }: Props) => {
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });

	const onSubmit: SubmitHandler<UserRegister> = async data => {
		setErrorMessage('');
		const { name, email, password, organizationId } = data;

		// Server action
		const resp = await registerUser(name, email, password, organizationId);

		if (!resp.ok) {
			setErrorMessage(resp.message);
			return;
		}

		await login(email.toLowerCase(), password);
		window.location.replace('/');
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col border p-5 rounded-lg shadow-md bg-white'
		>
			<label htmlFor='email'>Name </label>
			<input
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.name,
				})}
				type='text'
				autoFocus
				{...register('name')}
			/>

			<label htmlFor='email'>Email</label>
			<input
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.email,
				})}
				type='email'
				{...register('email')}
			/>

			<label htmlFor='email'>Password</label>
			<input
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.password,
				})}
				type='password'
				{...register('password')}
			/>

			{/* Create a list with select */}
			<label htmlFor='organizationId'>Organization</label>
			<select className='px-5 py-2 border bg-gray-200 rounded mb-5' {...register('organizationId')}>
				<option value=''>Select an organization</option>
				{organizations.map(organization => (
					<option key={organization.id} value={organization.id}>
						{organization.name}
					</option>
				))}
			</select>

			<span className='text-red-500'>{errorMessage} </span>

			<button className='border rounded-lg p-2'> Create Account</button>

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
