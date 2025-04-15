'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { login } from '@/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLogin, userLoginSchema } from '@/interfaces/models/user.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

export const LoginForm = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLogin>({ resolver: zodResolver(userLoginSchema) });

	const onSubmit: SubmitHandler<UserLogin> = async data => {
		setErrorMessage('');
		const { email, password } = data;

		// Server action
		const resp = await login(email, password);

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

			<div className='flex h-8 items-end space-x-1' aria-live='polite' aria-atomic='true'></div>

			<span className='text-red-500'>{errorMessage} </span>

			<button
				type='submit'
				className='bg-blue-600 text-white rounded-lg p-2 mb-5 hover:bg-blue-700'
			>
				Login
			</button>

			<div className='flex items-center my-5'>
				<div className='flex-1 border-t border-gray-500'></div>
				<div className='px-2 text-gray-800'>Or</div>
				<div className='flex-1 border-t border-gray-500'></div>
			</div>

			<Link href='/auth/new-account' className='border rounded-lg p-2 text-center'>
				Create a new account
			</Link>
		</form>
	);
};
