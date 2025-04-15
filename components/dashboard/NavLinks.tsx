'use client';

import Link from 'next/link';
import { RectangleStackIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
	{ name: 'Tasks', href: '/', icon: RectangleStackIcon },
	{
		name: 'Profile',
		href: '/profile',
		icon: UserCircleIcon,
	},
];

const defaultLinkStyle =
	'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3';

export const NavLinks = () => {
	const pathName = usePathname();

	return (
		<>
			{links.map(link => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(defaultLinkStyle, {
							'bg-sky-100 text-blue-600': pathName === link.href,
						})}
					>
						<LinkIcon className='w-6' />
						<p className='hidden md:block'>{link.name}</p>
					</Link>
				);
			})}
		</>
	);
};
