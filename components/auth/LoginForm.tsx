'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLogin, userLoginSchema } from '@/interfaces/models/user.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLogin>({ resolver: zodResolver(userLoginSchema) });

	const onSubmit: SubmitHandler<UserLogin> = async data => {
		const { email, password } = data;

		const resp = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});
		console.log({ resp });
		if (resp?.error) {
			toast.error(resp.error);
		} else {
			toast.success('Login successful');
			redirect('/');
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col border p-5 rounded-lg shadow-md bg-white text-dark'
		>
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

			<div className='flex h-8 items-end space-x-1' aria-live='polite' aria-atomic='true'></div>

			<button type='submit' className='bg-blue-600 text-white rounded-lg p-2 mb-5 '>
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
