'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	name: string;
	href: string;
	icon: React.JSX.Element;
}

export const NavbarItem = ({ name, href, icon }: Props) => {
	const pathName = usePathname();

	return (
		<Link
			key={name}
			href={href}
			className={clsx(
				'flex items-center gap-2 px-2 font-semibold hover:text-primary transition-colors',
				{
					'text-primary underline': pathName === href,
				}
			)}
		>
			{icon}
			<p className='hidden md:block'>{name}</p>
		</Link>
	);
};
