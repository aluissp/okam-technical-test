'use client';

import { logout } from '@/actions/auth';
import { IoPowerOutline } from 'react-icons/io5';

export const LogoutButton = () => {
	return (
		<button
			onClick={() => logout()}
			className='flex items-center gap-2 px-2 font-semibold hover:text-primary transition-colors'
		>
			<IoPowerOutline size={20} />
			<div className='hidden md:block'>Sign Out</div>
		</button>
	);
};
