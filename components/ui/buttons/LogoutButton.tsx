'use client';

import { logout } from '@/actions/auth';
import { IoPowerOutline } from 'react-icons/io5';

export const LogoutButton = () => {
	return (
		<button
			onClick={() => logout()}
			className='flex items-center gap-2 p-2 rounded-md bg-gray-50 hover:bg-sky-100 transition-colors hover:text-blue-600'
		>
			<IoPowerOutline size={20} />
			<div className='hidden md:block'>Sign Out</div>
		</button>
	);
};
